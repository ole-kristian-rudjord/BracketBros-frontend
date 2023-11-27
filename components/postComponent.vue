<script setup lang="ts">
  import { useTheme } from 'vuetify/lib/framework.mjs';
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '@/constants';

  const router = useRouter();
  const theme = useTheme();

  const { current } = theme;
  const surfaceColor = ref('');
  const postHighlightColor = ref('');

  const updateColors = () => {
    surfaceColor.value = current.value.colors.surface;
    postHighlightColor.value = current.value.dark
      ? current.value.colors['on-surface-variant']
      : current.value.colors['on-surface'];
  };

  watch(() => current.value, updateColors);

  const emit = defineEmits(['commentAdded']);

  const props = withDefaults(
    defineProps<{
      post: post;
      expandContent?: boolean;
      preventHighlighting?: boolean;
    }>(),
    { expandContent: false, preventHighlighting: false }
  );

  const userActivity = useUserActivity();

  const madeByUser = ref(false);
  const likedByUser = ref(false);
  const savedByUser = ref(false);

  watchEffect(() => {
    if (userActivity.value?.username) {
      madeByUser.value = userActivity.value.posts.includes(props.post.id);
      likedByUser.value = userActivity.value.likedPosts.includes(props.post.id);
      savedByUser.value = userActivity.value.savedPosts.includes(props.post.id);
    }
  });

  const contentContainer_ref = ref<HTMLElement | null>(null);
  const content_ref = ref<HTMLElement | null>(null);

  const contentContainer_isOverflowing = ref(false);
  const contentContainer_showOverflow = ref(false);

  const highlightPost = ref(false);
  const stop_highlightPost = ref(false);

  const checkOverflow = () => {
    nextTick(() => {
      if (
        !contentContainer_showOverflow.value &&
        contentContainer_ref.value &&
        content_ref.value
      ) {
        contentContainer_isOverflowing.value =
          contentContainer_ref.value.offsetHeight <
          content_ref.value.offsetHeight;
      }
    });
  };

  const postLink = `/post/${props.post.id}`;

  const goToPost = async () => {
    await router.push({ path: postLink });
  };

  const handleLikeClick = async () => {
    await likePost(props.post.id);
  };

  const handleCommentAdded = () => {
    emit('commentAdded');
  };

  const handleSaveClick = () => {
    savePost(props.post.id);
  };

  const handleShareClick = () => {
    const fullUrl = window.location.origin + postLink;

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        toast.success(
          'Link to post copied to clipboard.',
          defaultToastOptions.success
        );
      })
      .catch((error) => {
        console.error('Failed to copy text to clipboard', error);
      });
  };

  const handleEditClick = () => {
    router.push(`/edit-post/${props.post.id}`);
  };

  const showDeletePostDialog = ref(false);

  const handleDeletePost = () => {
    showDeletePostDialog.value = false;
    deletePost(props.post.id);
  };

  const handlePostClick = async (event: MouseEvent) => {
    for (let element of event.composedPath()) {
      if ((element as HTMLElement).tagName === 'A') {
        return;
      }
    }
    await goToPost();
  };

  onMounted(() => {
    updateColors();
    if (!props.expandContent) {
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
    }
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkOverflow);
  });
</script>

<template>
  <v-card
    class="post d-flex flex-row w-100 rounded-lg elevation-4"
    :class="{
      highlight: !preventHighlighting && highlightPost && !stop_highlightPost,
    }"
  >
    <div class="d-flex flex-column h-100 pa-3">
      <v-btn
        icon
        size="small"
        variant="plain"
        v-ripple="{ class: `text-red` }"
        class="rounded-lg"
        @click="handleLikeClick"
      >
        <v-icon
          :icon="
            likedByUser ? 'fa:fa-solid fa-heart' : 'fa:fa-regular fa-heart'
          "
          :color="likedByUser ? 'red' : ''"
        ></v-icon>
        <v-tooltip activator="parent" location="start" open-delay="500">
          Like this post
        </v-tooltip>
      </v-btn>
      <div class="mx-auto mb-1 text-caption text-medium-emphasis">
        {{ formatNumber(post.totalLikes + (likedByUser ? 1 : 0)) }}
      </div>

      <v-btn
        icon
        size="small"
        variant="plain"
        v-ripple="{ class: `text-green` }"
        class="rounded-lg"
      >
        <v-icon icon="fa:fa-regular fa-comment"></v-icon>
        <v-tooltip activator="parent" location="start" open-delay="500">
          Comment on this post
        </v-tooltip>
        <create-comment-dialog
          type="post"
          :post-id="post.id"
          :title="post.title"
          @comment-added="handleCommentAdded"
        ></create-comment-dialog>
      </v-btn>
      <div class="mx-auto mb-1 text-caption text-medium-emphasis">
        {{ formatNumber(post.totalComments) }}
      </div>

      <v-divider class="w-75 mx-auto my-3"></v-divider>

      <v-btn
        icon
        size="small"
        variant="plain"
        v-ripple="{ class: `text-blue` }"
        class="rounded-lg"
        @click="handleSaveClick"
      >
        <v-icon
          :icon="
            savedByUser
              ? 'fa:fa-solid fa-bookmark'
              : 'fa:fa-regular fa-bookmark'
          "
          :color="savedByUser ? 'blue' : ''"
        ></v-icon>
        <v-tooltip activator="parent" location="start" open-delay="500">
          Save this post
        </v-tooltip>
      </v-btn>

      <v-btn
        icon
        size="small"
        variant="plain"
        v-ripple="{ class: `text-yellow` }"
        class="rounded-lg"
        @click="handleShareClick"
      >
        <v-icon icon="fa:fa-regular fa-share-from-square"></v-icon>
        <v-tooltip activator="parent" location="start" open-delay="500">
          Share this post
        </v-tooltip>
      </v-btn>

      <template v-if="madeByUser">
        <v-divider class="w-75 mx-auto my-3"></v-divider>

        <v-btn
          icon
          size="small"
          variant="plain"
          color="warning"
          class="rounded-lg"
          @click="handleEditClick"
        >
          <v-icon icon="fa:fa-solid fa-pen-to-square"></v-icon>
          <v-tooltip activator="parent" location="start" open-delay="500">
            Edit this post
          </v-tooltip>
        </v-btn>

        <v-btn
          icon
          size="small"
          variant="plain"
          color="error"
          class="rounded-lg"
        >
          <v-icon icon="fa:fa-solid fa-trash-can"></v-icon>
          <v-tooltip activator="parent" location="start" open-delay="500">
            Delete this post
          </v-tooltip>
          <v-dialog
            v-model="showDeletePostDialog"
            activator="parent"
            width="auto"
          >
            <v-card class="px-10 py-6 rounded-lg">
              <v-card-item class="px-0">
                <v-card-title class="text-h5">
                  Delete "{{ post.title }}"
                </v-card-title>
              </v-card-item>
              <v-card-text class="px-0">
                Are you sure you want to permanently delete this post?
              </v-card-text>
              <v-card-actions class="px-0">
                <v-btn
                  variant="outlined"
                  class="text-body-1"
                  @click="showDeletePostDialog = false"
                >
                  No, cancel
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="error"
                  class="text-body-1"
                  @click="handleDeletePost"
                >
                  Yes, delete post
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </template>
    </div>

    <v-divider vertical class="my-5"></v-divider>

    <div class="main-container w-100 pa-5">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="text-medium-emphasis">
          <v-chip variant="flat" size="small" :color="post.category.color">
            {{ post.category.name }}
          </v-chip>
          <v-chip
            v-for="tag in post.tags"
            :key="tag.tagId"
            size="small"
            class="ml-1"
          >
            {{ tag.name }}
          </v-chip>
        </div>
        <div class="d-flex align-center">
          <div
            class="user-and-creation-info text-right text-caption text-medium-emphasis"
          >
            <div class="font-weight-bold">
              {{ post.user.username }}
            </div>
            <div>
              {{ formatTimeAgo(post.dateCreated) }}
            </div>
          </div>
          <v-avatar size="28px" class="ml-2">
            <v-img
              v-if="post.user.profilePicture"
              :src="post.user.profilePicture"
            ></v-img>
            <v-icon v-else color="primary" icon="fa:fa-solid fa-user"></v-icon>
          </v-avatar>
        </div>
      </div>

      <div
        class="h-100"
        @mouseenter="highlightPost = true"
        @mouseleave="highlightPost = false"
        @click="!preventHighlighting && handlePostClick($event)"
      >
        <div class="text-h4 pb-4">
          {{ post.title }}
        </div>

        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <div
              v-bind="props"
              ref="contentContainer_ref"
              class="content-container"
              :class="
                contentContainer_isOverflowing
                  ? contentContainer_showOverflow
                    ? 'show-overflow'
                    : 'hide-overflow'
                  : expandContent
                  ? 'show-overflow'
                  : ''
              "
            >
              <div
                ref="content_ref"
                class="content d-flex flex-column justify-center align-center"
              >
                <markdown-renderer :content="post.content"></markdown-renderer>
              </div>
              <v-btn
                v-if="
                  contentContainer_isOverflowing &&
                  !contentContainer_showOverflow
                "
                class="show-btn"
                :class="isHovering ? 'on-parent-hover' : ''"
                size="small"
                variant="tonal"
                @mouseenter="stop_highlightPost = true"
                @mouseleave="stop_highlightPost = false"
                @click="
                  (contentContainer_showOverflow = true),
                    (stop_highlightPost = false),
                    $event.stopPropagation()
                "
              >
                Show more
                <template v-slot:append>
                  <v-icon
                    icon="fa:fa-solid fa-chevron-down"
                    size="small"
                  ></v-icon>
                </template>
              </v-btn>
            </div>
          </template>
        </v-hover>
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
  .post {
    outline: 1px solid transparent;
    outline-offset: -1px;
    transition: outline-color 200ms ease;

    &.highlight {
      outline-color: v-bind(postHighlightColor);
    }
  }

  .user-and-creation-info {
    line-height: normal;
  }

  .content-container {
    max-height: 250px;
    overflow-y: hidden;
    position: relative;
    transition: max-height 2500ms linear;

    &.show-overflow {
      max-height: 5000px;
    }

    &.hide-overflow {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(transparent 50%, v-bind(surfaceColor) 100%);
        z-index: 0;
      }

      .show-btn {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 105%);
        z-index: 1;

        &.on-parent-hover {
          transform: translate(-50%, 0);
        }
      }
    }
  }
</style>
