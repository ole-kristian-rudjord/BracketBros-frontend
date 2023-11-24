<script setup lang="ts">
  useHead({
    title: 'Create post - BracketBros',
  });

  onMounted(() => {
    // if (!user.value) {
    //   router.push('/login');
    // }
    loadCategoryTags();
  });

  const loadCategoryTags = async () => {
    try {
      const { data: categoriesData } = await genericFetch(
        'GET',
        'https://localhost:7205/api/Post/GetCategories'
      );
      const { data: tagsData } = await genericFetch(
        'GET',
        'https://localhost:7205/api/Post/GetTags'
      );

      categoryList.value = categoriesData;
      categoryList.value.sort((a: category, b: category) => {
        return a.name.localeCompare(b.name);
      });

      tagsList.value = tagsData;
      tagsList.value.sort((a: tag, b: tag) => {
        return a.name.localeCompare(b.name);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const form = ref(false);
  const title = ref('');
  const categorySelected = ref('');
  let categoryList = ref<category[]>([]);
  let tagsSelected = ref<tag[]>([]);
  let tagsList = ref<tag[]>([]);
  const content = ref('');

  const isLoading = ref(false);
  const error = ref<null | 'unexpectedError'>(null);

  const rules = {
    required: (value: string) => !!value || 'Field is required',
    title: (value: string) => {
      const titlePattern = /^[0-9a-zA-ZæøåÆØÅ \-/:?.!#]{2,64}$/;
      return (
        titlePattern.test(value) ||
        'The title can only contain numbers, letters or characters -:?.!, and must be between 2 to 64 characters.'
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

  const register = async () => {
    isLoading.value = true;

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

    isLoading.value = false;
  };
</script>

<template>
  create post

  <nuxt-layout name="login-register">
    <!-- Please change this -->
    <v-form v-model="form" @submit.prevent="register">
      <v-text-field
        label="Title"
        v-model="title"
        variant="outlined"
        :rules="[rules.required, rules.title]"
        class="mb-3"
      ></v-text-field>
      <v-select
        v-model="categorySelected"
        :items="categoryList"
        item-value="categoryId"
        item-title="name"
        return-object
        label="Category"
        placeholder="Select a category"
        outlined
        :rules="[rules.required]"
        class="mb-3"
      >
      </v-select>
      <v-select
        v-model="tagsSelected"
        :items="tagsList"
        item-value="tagId"
        item-title="name"
        return-object
        multiple="true"
        label="Tags"
        placeholder="Select tags"
        outlined
        :rules="[rules.required]"
        class="mb-3"
      >
      </v-select>

      <v-textarea
        label="Content"
        v-model="content"
        variant="outlined"
        :rules="[rules.required, rules.content]"
        class="mb-3"
      ></v-textarea>

      <v-btn
        type="submit"
        size="x-large"
        variant="tonal"
        block=""
        color="primary"
        class="text-body-1"
        :disabled="!form"
        :loading="isLoading"
        >Create post
      </v-btn>
    </v-form>
  </nuxt-layout>
</template>
