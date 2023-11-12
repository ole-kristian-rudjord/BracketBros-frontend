<script setup lang="ts">
  const props = withDefaults(
    defineProps<{ comment: comment; showReplies?: boolean }>(),
    { showReplies: true }
  );

  const createRandomBoolean = () => {
    return Math.random() < 0.5;
  };

  const isMadeByUser = ref(createRandomBoolean());
  const isLiked = ref(createRandomBoolean());
  const hasCommented = ref(createRandomBoolean());
  const isSaved = ref(createRandomBoolean());
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
                icon="fa-solid fa-user"
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
          <v-btn variant="plain" size="x-small">
            <template v-slot:prepend>
              <v-icon
                :icon="isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
                :color="isLiked ? 'red' : ''"
              ></v-icon>
            </template>
            {{ formatNumber(comment.totalLikes) }}
          </v-btn>
          <v-btn variant="plain" size="x-small">
            <template v-slot:prepend>
              <v-icon
                :icon="
                  hasCommented ? 'fa-solid fa-comment' : 'fa-regular fa-comment'
                "
                :color="hasCommented ? 'green' : ''"
              ></v-icon>
            </template>
            {{ formatNumber(comment.commentReplies.length) }}
          </v-btn>
          <v-btn
            variant="plain"
            icon
            size="x-small"
            density="comfortable"
            class="rounded"
          >
            <v-icon
              :icon="
                isSaved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'
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
            <v-icon icon="fa-solid fa-pen-to-square" size="small"></v-icon>
          </v-btn>
          <v-btn
            variant="plain"
            icon
            size="x-small"
            density="comfortable"
            class="rounded"
          >
            <v-icon icon="fa-solid fa-trash-can" size="small"></v-icon>
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
