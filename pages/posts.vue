<script setup lang="ts">
  useHead({
    title: 'Browse posts - BracketBros',
  });

  const allPosts = useAllPosts();
  const numberOfDisplayedPosts = ref(5);

  const isNearBottom = () => {
    const scrollY = window.scrollY;
    const visible = document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    return visible + scrollY >= pageHeight - 200;
  };

  const handleScroll = () => {
    if (
      numberOfDisplayedPosts.value < allPosts.value.length &&
      isNearBottom()
    ) {
      numberOfDisplayedPosts.value += 5;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<template>
  <nuxt-layout name="centered-content">
    <post-component
      v-for="(post, index) in allPosts.slice(0, numberOfDisplayedPosts)"
      :key="index"
      :post="post"
      class="mb-8"
    ></post-component>
  </nuxt-layout>
</template>
