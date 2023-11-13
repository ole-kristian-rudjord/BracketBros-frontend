<script setup lang="ts">

  useHead({
    title: 'Browse posts - BracketBros',
  });

  const userActivity = ref<user>();
  onMounted(() => {
     const user  = getUserActivity();
      userActivity.value = user;
  });
  

</script>

<template>
  <div>
    <h1>Activity</h1>
    <div v-if="userActivity">
      <p>Username: {{ userActivity.username }}</p>
      <p> Creation date: {{ userActivity.creationdate }}  </p>
    </div>
  </div>

   
</template>
