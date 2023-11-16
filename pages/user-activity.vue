<script setup lang="ts">
  const router = useRouter();

  useHead({
    title: 'Browse posts - BracketBros',
  });

  const userActivity = ref<user>();
  onMounted(() => {
    const user = getSavedUserActivity();
    // if (!user) {
    //    router.push('/login'); // Redirect to login if not logged in
    //   return;
    // } 
    userActivity.value = user;


    const fulluserActivity = getUserActivity(true);
    console.log(fulluserActivity);
  });
</script>

<template>
  <div>
    <h1>Activity</h1>
    <div v-if="userActivity">
      <p>Username: {{ userActivity.username }}</p>
      <p>Creation date: {{ userActivity.creationdate }}</p>

      <div v-if="userActivity.posts && userActivity.posts.length > 0">
      <h2>Your Posts</h2>
        <div v-for="post in userActivity.posts" :key="post.id">
          <p>{{ post.title }}</p>
          <p>{{ post.content }}</p>
          <p>{{ post.creationdate }}</p>
        </div>
    </div>
    <div v-else>
      <p>You have no posts</p>
  </div>
</div>
</div>
</template>
