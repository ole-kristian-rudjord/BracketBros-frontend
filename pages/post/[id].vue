<script setup lang="ts">
  const route = useRoute();
  console.log(route.params);

  const post = ref<post>();

  const title = ref('BracketBros');

  watch(
    post,
    (newValue) => {
      if (newValue?.title) {
        title.value = `${newValue.title} - BracketBros`;
      }
    },
    { immediate: true }
  );

  useHead({
    title: title,
  });

  onMounted(async () => {
    const postId = Number(route.params.id);

    if (!isNaN(postId)) {
      const { data, error } = await getPostById(postId);
      if (error) {
        console.error('Error fetching post:', error);
      } else {
        post.value = data;
      }
    } else {
      console.error('Invalid Post ID'); // TODO: Create toastify error instead
    }
  });
</script>

<template>
  {{ post }}
</template>
