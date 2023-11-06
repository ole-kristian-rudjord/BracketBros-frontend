<script setup lang="ts">
  import { placeholder_post } from '~/constants';

  onMounted(async () => {
    const { data, error } = await getAllPosts();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  });
</script>

<template>
  <div class="d-flex justify-center w-100 py-8 px-4">
    <post :propPost="placeholder_post"></post>
  </div>
</template>
