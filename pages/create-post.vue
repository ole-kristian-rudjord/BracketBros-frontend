<script setup lang="ts">
  useHead({
    title: 'Create post - BracketBros',
  });

  let categories = ref<category[]>([]);
  let tags = ref<tag[]>([]);

const loadData = async () => {
  const { data: categoriesData } = await genericFetch('https://localhost:7205/api/Post/GetCategories', 'GET');
  const { data: tags } = await genericFetch('https://localhost:7205/api/Post/GetTags', 'GET');
  
 /* categories.value = categoriesData;
  tags.value = tags;*/

};



  onMounted(() => {
    // if (!user.value) {
    //   router.push('/login');
    // }
    loadData();

  });


const form = ref(false);
const title = ref('');
const category = ref('');
const content = ref('');


const isLoading = ref(false);
const error = ref<null | 'unexpectedError'>(null);

const rules = {
  required: (value: string) => !!value || 'Field is required',
  title: (value: string) => {
    const titlePattern = /^[0-9a-zA-ZæøåÆØÅ \-/:/?/./!/#]{2,64}$/;
    return titlePattern.test(value) || 'The title can only contain numbers, letters or characters -:?.!, and must be between 2 to 64 characters.';
  },
  content: (value: string) => {
    const contentPattern = /^.{2,4096}$/;
    return contentPattern.test(value) || 'The content must be between 2 to 4096 characters.';
  }
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

<template>create post

<nuxt-layout name="login-register">   <!-- Please change this -->
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
        v-model="category"
        :items="categories"
        item-text="name"
        item-value="categoryId"
        variant="outlined"
        :rules="[rules.required]"
        class="mb-3"></v-select>
<!-- 
       <v-select multiple
        label="Tags"
        v-model="tag"
        :items="tags"
        item-text="name"
        item-value="tagId"
        variant="outlined"
        :rules="[rules.required]"
        class="mb-3"></v-select> -->


      <v-textarea
        label="Content"
        v-model="content"
        variant="outlined"
        :rules="[rules.required, rules.content]"
        class="mb-3"></v-textarea>

      <v-btn
        type="submit"
        size="x-large"
        variant="tonal"
        block
        class="text-body-1"
        :disabled="!form"
        :loading="isLoading"
      >Create post</v-btn>
    </v-form>
  </nuxt-layout>
</template>
