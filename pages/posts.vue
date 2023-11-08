<script setup lang="ts">
  useHead({
    title: 'Browse posts - BracketBros',
  });

  const posts = ref<post[]>();

  onMounted(async () => {
    const { data, error } = await getAllPosts();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      posts.value = data;
    }
  });
</script>

<template>
  <div class="d-flex flex-column align-center w-100 py-12 px-4">
    <post
      v-for="(post, index) in posts"
      :key="index"
      :propPost="post"
      class="mb-12"
    ></post>
  </div>
</template>
