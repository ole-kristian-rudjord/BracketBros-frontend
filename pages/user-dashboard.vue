<script setup lang="ts">
  useHead({
    title: 'Browse posts - BracketBros',
  });

  const router = useRouter();

  const createdPosts = ref<post[]>([]);
  const likedPosts = ref<post[]>([]);
  const createdComments = ref<comment[]>([]);
  const likedComments = ref<comment[]>([]);
  const basicUserActivity = ref<user>();

  onMounted(async () => {
    onMounted(() => {
      checkLoginAndReroute();
    });

    const response = getFullUserActivity();

    console.log(response);
    // const user = getSavedUserActivity();
    // if (!user) {
    //   await router.push('/login'); // Redirect to login if not logged in
    //   return;
    // }
    // basicUserActivity.value = user;
    // const {data: {comments, likedcomments, likedposts, posts}} = await getUserActivity(true);
    // createdPosts.value = posts;
    // likedPosts.value = likedposts;
    // createdComments.value = comments;
    // likedComments.value = likedcomments;
  });
</script>

<template>
  <nuxt-layout name="centered-content">
    <div>
      <h1>Activity</h1>
      <div v-if="createdPosts && createdPosts.length > 0">
        <h2>Your Posts</h2>
        <div v-for="post in createdPosts" :key="post.id">
          <p>{{ post.title }}</p>
          <v-btn @click="router.push(`/post/${post.id}`)">View</v-btn>
        </div>
      </div>
      <div v-else>
        <p>You have no posts</p>
      </div>
      <div v-if="createdPosts && createdPosts.length > 0">
        <h2>Your comments</h2>
        <div v-for="comment in createdComments" :key="comment.commentId">
          <p>{{ comment.content }}</p>
          <v-btn @click="router.push(`/post/${comment.postId}`)">View</v-btn>
        </div>
      </div>
      <div v-else>
        <p>You have no comments</p>
      </div>
    </div>
  </nuxt-layout>
</template>
