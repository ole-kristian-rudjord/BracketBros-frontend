<script setup lang="ts">
  const emit = defineEmits(['commentDeleted']);

  const props = withDefaults(
    defineProps<{ comment: comment; showReplies?: boolean }>(),
    { showReplies: true }
  );

  const madeByUser = ref(false);
  const likedByUser = ref(false);
  const savedByUser = ref(false);

  const userActivity = useUserActivity();

  if (userActivity.value) {
    const refUserActivity = userActivity.value;
    refUserActivity.username === props.comment.user.username
      ? (madeByUser.value = true)
      : (madeByUser.value = false);
    refUserActivity.likedComments.includes(props.comment.commentId)
      ? (likedByUser.value = true)
      : (likedByUser.value = false);
    refUserActivity?.savedComments.includes(props.comment.commentId)
      ? (savedByUser.value = true)
      : (savedByUser.value = false);
  }

  watchEffect(() => {
    if (userActivity.value?.username) {
      madeByUser.value = userActivity.value.comments.includes(
        props.comment.commentId
      );
      likedByUser.value = userActivity.value.likedComments.includes(
        props.comment.commentId
      );
      savedByUser.value = userActivity.value.savedComments.includes(
        props.comment.commentId
      );
    }
  });

  const handleLikeComment = async () => {
    const response = await likeComment(props.comment.commentId);
    if (response && response?.data) {
      if (response.data === 'Liked comment successfully') {
        likedByUser.value = true;
        props.comment.totalLikes += 1;
      } else {
        likedByUser.value = false;
        props.comment.totalLikes -= 1;
      }
    } else {
      console.log(response);
    }
  };

  const handleSaveComment = () => {
    saveComment(props.comment.commentId);
  };

  const showDeleteCommentDialog = ref(false);

  const handleDeleteComment = () => {
    showDeleteCommentDialog.value = false;
    deleteComment(props.comment.commentId);
    emit('commentDeleted');
  };
</script>

<template>
  <div>
    <v-card class="px-1 py-2 rounded-lg elevation-4">
      <div class="d-flex flex-row align-center px-2">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-avatar
              v-bind="props"
              size="12px"
              class="user-avatar mr-2 border"
              :class="isHovering ? 'is-hovering' : ''"
            >
              <v-img
                v-if="comment.user.profilePicture"
                :src="comment.user.profilePicture"
              ></v-img>
              <v-icon
                v-else
                color="primary"
                icon="fa:fa-solid fa-user"
                size="xx-small"
              ></v-icon>
            </v-avatar>
          </template>
        </v-hover>
        <span class="text-caption">
          <span class="mr-1 text-medium-emphasis">
            {{ comment.user.username }}
          </span>
          <span class="text-disabled">
            {{ formatTimeAgo(comment.dateCreated) }}
          </span>
        </span>
      </div>
      <div class="px-2 py-1">
        {{ comment.content }}
      </div>
      <div class="d-flex flex-row align-center justify-space-between px-1">
        <div>
          <v-btn variant="plain" size="x-small" @click="handleLikeComment">
            <template v-slot:prepend>
              <v-icon
                :icon="
                  likedByUser
                    ? 'fa:fa-solid fa-heart'
                    : 'fa:fa-regular fa-heart'
                "
                :color="likedByUser ? 'red' : ''"
              ></v-icon>
            </template>
            {{ formatNumber(comment.totalLikes) }}
          </v-btn>
          <v-btn variant="plain" size="x-small">
            <template v-slot:prepend>
              <v-icon icon="fa:fa-regular fa-comment"></v-icon>
            </template>
            {{ formatNumber(comment.commentReplies.length) }}
          </v-btn>
          <v-btn
            @click="handleSaveComment"
            variant="plain"
            icon
            size="x-small"
            density="comfortable"
            class="rounded"
          >
            <v-icon
              :icon="
                savedByUser
                  ? 'fa:fa-solid fa-bookmark'
                  : 'fa:fa-regular fa-bookmark'
              "
              :color="savedByUser ? 'blue' : ''"
              size="small"
            ></v-icon>
          </v-btn>
        </div>
        <div v-if="madeByUser">
          <v-btn
            variant="plain"
            icon
            size="x-small"
            density="comfortable"
            class="rounded"
          >
            <v-icon icon="fa:fa-solid fa-pen-to-square" size="small"></v-icon>
          </v-btn>
          <v-btn
            @click="handleDeleteComment"
            variant="plain"
            icon
            size="x-small"
            density="comfortable"
            class="rounded"
          >
            <v-icon icon="fa:fa-solid fa-trash-can" size="small"></v-icon>
            <v-dialog
              v-model="showDeleteCommentDialog"
              activator="parent"
              width="auto"
            >
              <v-card class="px-10 py-6 rounded-lg">
                <v-card-item class="px-0">
                  <v-card-title class="text-h5">Delete comment</v-card-title>
                </v-card-item>
                <v-card-text class="px-0">
                  Are you sure you want to permanently delete this comment?
                  <v-divider class="my-2"></v-divider>
                  "{{ comment.content }}"
                  <v-divider class="mt-2"></v-divider>
                </v-card-text>
                <v-card-actions class="px-0">
                  <v-btn
                    variant="outlined"
                    class="text-body-1"
                    @click="showDeleteCommentDialog = false"
                  >
                    No, cancel
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    color="error"
                    class="text-body-1"
                    @click="handleDeleteComment"
                  >
                    Yes, delete comment
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>
        </div>
      </div>
    </v-card>
    <commentComponent
      v-for="(reply, index) in comment.commentReplies"
      :key="index"
      :comment="reply"
      class="mt-2 ml-6"
    ></commentComponent>
  </div>
</template>

<style scoped lang="scss">
  .user-avatar {
    transition: transform 200ms ease;

    &.is-hovering {
      transform: scale(2.25);
    }
  }
</style>
