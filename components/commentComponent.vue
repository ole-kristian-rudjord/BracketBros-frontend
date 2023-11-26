<script setup lang="ts">
  const props = withDefaults(
    defineProps<{ comment: comment; showReplies?: boolean }>(),
    { showReplies: true }
  );

  const isMadeByUser = ref(false);
  const isLiked = ref(false);
  const isSaved = ref(false);

  const userActivity = useUserActivity();

  if (userActivity.value) {
    const refUserActivity = userActivity.value;
    refUserActivity.username === props.comment.user.username
      ? (isMadeByUser.value = true)
      : (isMadeByUser.value = false);
    refUserActivity.likedComments.includes(props.comment.commentId)
      ? (isLiked.value = true)
      : (isLiked.value = false);
    refUserActivity?.savedComments.includes(props.comment.commentId)
        ? (isSaved.value = true)
        : (isSaved.value = false);
  }

  const updateLikeComment = async () => {
    await checkLoginAndReroute();

    const response = await likeComment(props.comment.commentId);
    if (response && response.data) {
      if (response.data === 'Liked comment successfully') {
        isLiked.value = true;
        props.comment.totalLikes += 1;
      } else {
        isLiked.value = false;
        props.comment.totalLikes -= 1;
      }
    } else {
      console.log(response);
    }
  };



  const updateSaveComment = async () => {
    await checkLoginAndReroute();

    const response = await saveComment(props.comment.commentId);
    if (response && response.data) {
      isSaved.value = response.data === 'Saved comment successfully';
    } else {
      console.log(response);
    }
  };

  const actionDeleteComment = async () => {
     await checkLoginAndReroute();

    const response = await deleteComment(props.comment.commentId);
    if (response.data) {
      console.log(response.data);
    } else {
      console.log(response);
    }
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
          <v-btn variant="plain" size="x-small" @click="updateLikeComment">
            <template v-slot:prepend>
              <v-icon
                :icon="
                  isLiked ? 'fa:fa-solid fa-heart' : 'fa:fa-regular fa-heart'
                "
                :color="isLiked ? 'red' : ''"
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
          <v-btn @click="updateSaveComment"
            variant="plain"
            icon
            size="x-small"
            density="comfortable"
            class="rounded"
          >
            <v-icon
              :icon="
                isSaved
                  ? 'fa:fa-solid fa-bookmark'
                  : 'fa:fa-regular fa-bookmark'
              "
              :color="isSaved ? 'blue' : ''"
              size="small"
            ></v-icon>
          </v-btn>
        </div>
        <div v-if="isMadeByUser">
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
            @click="actionDeleteComment"
            variant="plain"
            icon
            size="x-small"
            density="comfortable"
            class="rounded"
          >
            <v-icon icon="fa:fa-solid fa-trash-can" size="small"></v-icon>
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
