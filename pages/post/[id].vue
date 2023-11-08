<script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '@/constants';

  const route = useRoute();

  const post = ref<post | null>(null);

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
        toast.error('Error fetching post', defaultToastOptions.error);
      } else {
        post.value = data;
      }
    } else {
      console.error('Invalid Post ID');
      toast.error('Invalid Post ID', defaultToastOptions.error);
    }
  });
</script>

<template>
  <div class="d-flex flex-column align-center w-100 py-12 px-4">
    <post-component v-if="post" :post="post"></post-component>
  </div>
</template>
