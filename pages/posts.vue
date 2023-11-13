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
  <nuxt-layout name="centered-content">
    <post-component
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
      class="mb-8"
    ></post-component>
  </nuxt-layout>
</template>
