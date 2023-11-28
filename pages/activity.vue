<script setup lang="ts">
  useHead({
    title: 'My activity - BracketBros',
  });

  const router = useRouter();

  const createdPosts = ref<post[]>([]);
  const likedPosts = ref<post[]>([]);
  const createdComments = ref<comment[]>([]);
  const likedComments = ref<comment[]>([]);
  const savedComments = ref<comment[]>([]);

  const basicUserActivity = ref<user>();

  onMounted(async () => {
    onMounted(() => {
      checkLoginAndReroute();
    });

    const response = await getUserComments();
    console.log(response);
  });
</script>

<template>
  <nuxt-layout name="centered-content"></nuxt-layout>
</template>
