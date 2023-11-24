<script setup lang="ts">
import {toast} from "vue3-toastify";
import {defaultToastOptions} from "~/constants";

useHead({
  title: 'BracketBros',
});

const availableCategories = ref<category[]>([]);
const availableCategories_isLoading = ref(false);


onMounted(async () => {
  // TODO: reroute user to login if not logged in

  availableCategories_isLoading.value = true;

  const categoriesData = await getAllCategories();
  if (categoriesData) {
    availableCategories.value = categoriesData;
  } else {
    toast.error(
        'Error fetching categories from the database.',
        defaultToastOptions.error
    );
  }
  availableCategories_isLoading.value = false;
});

</script>

<template>index


  <nuxt-layout name="centered-content">

    <div v-if="availableCategories && availableCategories.length > 0">
      <h2>Your Posts</h2>
      <div v-for="category in availableCategories" :key="category.categoryId">
        <p>{{ category.url }}</p>
        <img :src="category.url" :alt="`Category `+  category.name"/>

        <!--
                <v-btn @click="router.push(`/post/${post.id}`)">View</v-btn>
        -->
      </div>
    </div>
    <div v-else>
      <p>You have no posts</p>
    </div>

  </nuxt-layout>


</template>
