<script setup lang="ts">
  import { useTheme } from 'vuetify/lib/framework.mjs';

  const theme = useTheme();
  const surfaceColor = ref(theme.current.value.colors.surface);

  watch(
    () => theme.current.value.colors.surface,
    (newSurfaceColor) => {
      surfaceColor.value = newSurfaceColor;
    },
    { immediate: true }
  );

  const props = defineProps<{ propPost: post }>();

  const formattedContent = computed(() => {
    return props.propPost.content.replace(/\n/g, '<br>');
  });

  const madeByLoggedInUser = false;

  const contentContainer_ref = ref<HTMLElement | null>(null);
  const content_ref = ref<HTMLElement | null>(null);

  const contentContainer_isOverflowing = ref(false);
  const contentContainer_showOverflow = ref(false);

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

  onMounted(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkOverflow);
  });
</script>

<template>
  <v-card max-width="700" class="d-flex flex-row w-100 rounded-lg elevation-6">
    <div class="d-flex flex-column h-100 pa-3">
      <v-btn
        icon
        size="small"
        variant="plain"
        v-ripple="{ class: `text-red` }"
        class="rounded-lg"
      >
        <v-icon icon="fa-regular fa-heart"></v-icon>
        <v-tooltip activator="parent" location="start" open-delay="1000">
          Like this post
        </v-tooltip>
      </v-btn>
      <div class="mx-auto mb-1 text-caption text-medium-emphasis">
        {{ formatNumber(propPost.totalLikes) }}
      </div>

      <v-btn
        icon
        size="small"
        variant="plain"
        v-ripple="{ class: `text-green` }"
        class="rounded-lg"
      >
        <v-icon icon="fa-regular fa-comment"></v-icon>
        <v-tooltip activator="parent" location="start" open-delay="1000">
          Comment on this post
        </v-tooltip>
      </v-btn>
      <div class="mx-auto mb-1 text-caption text-medium-emphasis">
        {{ formatNumber(propPost.totalComments) }}
      </div>

      <v-divider class="w-75 mx-auto my-3"></v-divider>

      <v-btn
        icon
        size="small"
        variant="plain"
        v-ripple="{ class: `text-blue` }"
        class="rounded-lg"
      >
        <v-icon icon="fa-regular fa-bookmark"></v-icon>
        <v-tooltip activator="parent" location="start" open-delay="1000">
          Save this post
        </v-tooltip>
      </v-btn>

      <v-btn
        icon
        size="small"
        variant="plain"
        v-ripple="{ class: `text-yellow` }"
        class="rounded-lg"
      >
        <v-icon icon="fa-regular fa-share-from-square"></v-icon>
        <v-tooltip activator="parent" location="start" open-delay="1000">
          Share this post
        </v-tooltip>
      </v-btn>

      <template v-if="madeByLoggedInUser">
        <v-divider class="w-75 mx-auto my-3"></v-divider>

        <v-btn
          icon
          size="small"
          variant="plain"
          v-ripple="{ class: `text-orange` }"
          class="rounded-lg"
        >
          <v-icon icon="fa-solid fa-pen-to-square"></v-icon>
          <v-tooltip activator="parent" location="start" open-delay="1000">
            Edit this post
          </v-tooltip>
        </v-btn>

        <v-btn
          icon
          size="small"
          variant="plain"
          v-ripple="{ class: `text-red` }"
          class="rounded-lg"
        >
          <v-icon icon="fa-solid fa-trash-can"></v-icon>
          <v-tooltip activator="parent" location="start" open-delay="1000">
            Delete this post
          </v-tooltip>
        </v-btn>
      </template>
    </div>

    <v-divider vertical class="my-5"></v-divider>

    <div class="w-100 pa-5">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="text-medium-emphasis">
          <v-chip variant="flat" size="small" :color="propPost.category.color">
            {{ propPost.category.name }}
          </v-chip>
          <v-chip
            v-for="(tag, index) in propPost.tags"
            :key="index"
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
              {{ propPost.user.username }}
            </div>
            <div>
              {{ formatTimeAgo(propPost.dateCreated) }}
            </div>
          </div>
          <v-avatar size="28px" class="ml-2">
            <v-img
              v-if="propPost.user.profilePicture"
              :src="propPost.user.profilePicture"
            ></v-img>
            <v-icon v-else color="primary" icon="fa-solid fa-user"></v-icon>
          </v-avatar>
        </div>
      </div>
      <div class="text-h4 mb-5">{{ propPost.title }}</div>
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
                : ''
            "
          >
            <div
              ref="content_ref"
              class="content"
              v-html="formattedContent"
            ></div>
            <v-btn
              v-if="
                contentContainer_isOverflowing && !contentContainer_showOverflow
              "
              class="show-btn"
              :class="isHovering ? 'on-parent-hover' : ''"
              size="small"
              variant="tonal"
              @click="contentContainer_showOverflow = true"
            >
              Show more
              <template v-slot:append>
                <v-icon icon="fa-solid fa-chevron-down" size="small"></v-icon>
              </template>
            </v-btn>
          </div>
        </template>
      </v-hover>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
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
        transform: translate(-50%, 100%);
        z-index: 1;

        &.on-parent-hover {
          transform: translate(-50%, 0);
        }
      }
    }
  }
</style>
