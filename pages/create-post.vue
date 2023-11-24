<script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '@/constants';

  useHead({
    title: 'Create post - BracketBros',
  });

  const availableCategories = ref<category[]>([]);
  const availableTags = ref<tag[]>([]);

  const form = ref(false);
  const title = ref('');
  const selectedCategory = ref<category>();
  const selectedTags = ref<tag[]>([]);
  const content = ref('');

  const availableCategories_isLoading = ref(false);
  const availableTags_isLoading = ref(false);
  const createPost_isLoading = ref(false);

  const rules = {
    required: (value: any) => {
      if (typeof value === 'string') {
        return value.trim().length > 0 || 'Field is required';
      }
      if (Array.isArray(value)) {
        return value.length > 0 || 'Field is required';
      }
      return !!value || 'Field is required';
    },
    title: (value: string) => {
      const titlePattern = /^[0-9a-zA-ZæøåÆØÅ \-\/:?.!#@$%&*()]{2,64}$/;
      return (
        titlePattern.test(value) ||
        'The title can only contain numbers, letters, or characters -:?.!,@#$%&*(), and must be between 2 to 64 characters.'
      );
    },
    content: (value: string) => {
      const contentPattern = /^.{2,4096}$/;
      return (
        contentPattern.test(value) ||
        'The content must be between 2 to 4096 characters.'
      );
    },
  };

  const register = () => {
    createPost_isLoading.value = true;

    // const post: post = {
    //   title: title.value,
    //   category: category.value,
    //   content: content.value,
    // };

    // const response = await createPost(registerData);

    // if (response.data) {
    //   console.log('success');
    //   // Set user
    //   error.value = null;
    // } else {
    //   error.value = 'unexpectedError';
    // }

    createPost_isLoading.value = false;
  };

  onMounted(async () => {
    // TODO: reroute user to login if not logged in

    availableCategories_isLoading.value = true;
    availableTags_isLoading.value = true;

    const { data: categoriesData } = await getAllCategories();
    if (categoriesData) {
      availableCategories.value = categoriesData;
    } else {
      toast.error(
        'Error fetching categories from the database.',
        defaultToastOptions.error
      );
    }
    availableCategories_isLoading.value = false;

    const { data: tagsData } = await getAllTags();
    if (tagsData) {
      availableTags.value = tagsData;
    } else {
      toast.error(
        'Error fetching tags from the database.',
        defaultToastOptions.error
      );
    }
    availableTags_isLoading.value = false;
  });
</script>

<template>
  <nuxt-layout name="centered-content">
    <v-sheet class="pa-12 rounded-lg elevation-4">
      <v-form v-model="form" @submit.prevent="register">
        <v-text-field
          label="Title"
          v-model="title"
          variant="outlined"
          :rules="[rules.required, rules.title]"
          class="mb-3"
        ></v-text-field>

        <v-select
          label="Category"
          :items="availableCategories"
          :item-title="(category: category) => category.name"
          v-model="selectedCategory"
          :rules="[rules.required]"
          variant="outlined"
          class="mb-3"
        >
        </v-select>

        <v-select
          label="Tags"
          :items="availableTags"
          :item-title="(tag: tag) => tag.name"
          v-model="selectedTags"
          :rules="[rules.required]"
          multiple
          chips
          variant="outlined"
          class="mb-3"
        >
        </v-select>

        <v-textarea
          label="Content"
          v-model="content"
          variant="outlined"
          :rules="[rules.required, rules.content]"
          class="mb-6"
        ></v-textarea>

        <v-btn
          type="submit"
          size="x-large"
          variant="flat"
          color="primary"
          :disabled="!form"
          :loading="createPost_isLoading"
          block
          class="text-body-1"
        >
          Create post
        </v-btn>
      </v-form>
    </v-sheet>
  </nuxt-layout>
</template>
