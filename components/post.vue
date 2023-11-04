<script setup lang="ts">
  const props = defineProps<{ propPost: post }>();

  const formattedContent = computed(() => {
    return props.propPost.content.replace(/\n/g, '<br>');
  });

  const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000; // 365 * 24 * 60 * 60

    if (interval > 1) {
      return `${Math.floor(interval)} years ago`;
    }
    if (interval >= 1) {
      return `1 year ago`;
    }

    interval = seconds / 2592000; // 30 * 24 * 60 * 60
    if (interval > 1) {
      return `${Math.floor(interval)} months ago`;
    }

    interval = seconds / 86400; // 24 * 60 * 60
    if (interval > 1) {
      return `${Math.floor(interval)} days ago`;
    }
    if (interval >= 1) {
      return `1 day ago`;
    }

    interval = seconds / 3600; // 60 * 60
    if (interval > 1) {
      return `${Math.floor(interval)} hours ago`;
    }
    if (interval >= 1) {
      return `1 hour ago`;
    }

    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} minutes ago`;
    }
    if (interval >= 1) {
      return `1 minute ago`;
    }

    return 'just now';
  };
</script>

<template>
  <v-card max-width="700" class="d-flex flex-row w-100 rounded-lg elevation-6">
    <div class="d-flex flex-column h-100 pa-3">
      <v-btn
        icon="fa-regular fa-heart"
        size="small"
        variant="plain"
        v-ripple="{ class: `text-red` }"
        class="rounded-lg"
      >
      </v-btn>
      <div class="mx-auto mb-1 text-caption text-medium-emphasis">
        {{ propPost.totalLikes }}
      </div>

      <v-btn
        icon="fa-regular fa-comment"
        size="small"
        variant="plain"
        v-ripple="{ class: `text-green` }"
        class="rounded-lg"
      >
      </v-btn>
      <div class="mx-auto mb-1 text-caption text-medium-emphasis">
        {{ propPost.totalComments }}
      </div>

      <v-divider class="w-75 mx-auto my-3"></v-divider>

      <v-btn
        icon="fa-regular fa-bookmark"
        size="small"
        variant="plain"
        v-ripple="{ class: `text-blue` }"
        class="rounded-lg"
      >
      </v-btn>

      <v-btn
        icon="fa-solid fa-share"
        size="small"
        variant="plain"
        v-ripple="{ class: `text-yellow` }"
        class="rounded-lg"
      >
      </v-btn>
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
              {{ timeAgo(propPost.dateCreated) }}
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

      <div v-html="formattedContent"></div>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
  .user-and-creation-info {
    line-height: normal;
  }
</style>
