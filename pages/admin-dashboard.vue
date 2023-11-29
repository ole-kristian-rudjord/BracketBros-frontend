<script setup lang="ts">
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '@/constants';

  useHead({
    title: 'Admin Dashboard - BracketBros',
  });

  const display = useDisplay();

  const numberOfCategoryCols = computed(() => {
    return display.mdAndUp.value ? 4 : display.smAndUp.value ? 6 : 12;
  });

  const availableCategories = ref<category[]>([]);

  const showCreateCategoryDialog = ref(false);
  const isLoading = ref(false);

  const newCategoryForm = ref(false);
  const newCategoryColor = ref('#00BCD4');
  const newCategoryName = ref('');
  const newCategoryURL = ref('');
  const newCategoryFile = ref<File[]>([]);

  const rules = {
    required: (value: string) => {
      return value.trim().length > 0 || 'Field is required';
    },
    content: (value: string) => {
      value = value.trimEnd();
      return (
        (value.length >= 2 && value.length <= 32) ||
        'The content must be between 2 to 32 characters.'
      );
    },
  };

  const createNewCategory = async () => {
    isLoading.value = true;
    const body = new FormData();

    body.append('name', newCategoryName.value);
    body.append('url', newCategoryURL.value);
    body.append('color', newCategoryColor.value);
    body.append('file', newCategoryFile.value[0]);

    const response = await fileFetch({
      method: 'POST',
      url: 'http://localhost:5112/api/Dashboard/newCategory',
      body: body,
    });

    if (response.status === 200) {
      toast.success(`Category has been created`, defaultToastOptions.success);

      showCreateCategoryDialog.value = false;

      newCategoryColor.value = '#00BCD4';
      newCategoryName.value = '';
      newCategoryURL.value = '';
      newCategoryFile.value = [];

      await fetchCategories();
    } else if (response.status === 422) {
      toast.error(
        'You are not authorized to create a new category.',
        defaultToastOptions.error
      );
    } else {
      toast.error(
        'An unexpected error occurred, please try again later.',
        defaultToastOptions.error
      );
    }

    isLoading.value = false;
  };

  const fetchCategories = async () => {
    const getAllCategories_data = await getAllCategories();
    if (getAllCategories_data) {
      availableCategories.value = getAllCategories_data.sort(
        (a: category, b: category) => a.name.localeCompare(b.name)
      );
    } else {
      toast.error(
        'Error fetching categories from the database.',
        defaultToastOptions.error
      );
    }
  };

  const deleteCategory = async (categoryId: number) => {
    const response = await genericFetch({
      method: 'GET',
      url: `http://localhost:5112/api/Dashboard/deleteCategory/${categoryId}`,
    });

    if (response.status === 200) {
      toast.success(`Category has been deleted`, defaultToastOptions.success);
      await fetchCategories(); // Refresh the categories after deletion
      await updateAllPostsState();
      await updateUserActivityState();
    } else if (response.status === 422) {
      toast.error(
        'You are not authorized to delete this category.',
        defaultToastOptions.error
      );
    } else {
      toast.error(
        'An unexpected error occurred, please try again later.',
        defaultToastOptions.error
      );
    }
  };

  onMounted(async () => {
    await fetchCategories();
  });
</script>

<template>
  <div style="max-width: 1000px" class="w-100 mx-auto px-4 py-16">
    <h1 class="text-h4 font-weight-bold mb-4">Admin Dashboard</h1>

    <v-btn variant="tonal" prepend-icon="fa:fa-solid fa-plus">
      Create new category
      <v-dialog
        v-model="showCreateCategoryDialog"
        activator="parent"
        max-width="600"
      >
        <v-card class="px-10 py-6 rounded-lg">
          <v-form v-model="newCategoryForm">
            <h1 class="text-h5 pb-4">New category</h1>
            <v-text-field
              v-model="newCategoryName"
              label="Category name"
              variant="outlined"
              :rules="[rules.required, rules.content]"
              counter="32"
              class="mb-2"
            ></v-text-field>
            <v-file-input
              v-model="newCategoryFile"
              label="Category image"
              accept="image/png, image/jpeg, image/jpg"
              variant="outlined"
              class="mb-2"
            >
            </v-file-input>
            <v-color-picker
              v-model="newCategoryColor"
              mode="rgb"
              class="mb-8 elevation-0 border rounded-lg"
            ></v-color-picker>
          </v-form>

          <v-card-actions class="px-0">
            <v-btn
              variant="outlined"
              class="text-body-1"
              @click="showCreateCategoryDialog = false"
            >
              Cancel
            </v-btn>

            <v-btn
              @click="createNewCategory"
              variant="outlined"
              color="cyan"
              class="text-body-1"
              :loading="isLoading"
              :disabled="
                !newCategoryName && (!newCategoryURL || !newCategoryFile)
              "
            >
              Create new category
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>

    <v-divider class="my-8"></v-divider>

    <h2 class="mb-6 text-h4 font-weight-bold">Categories</h2>

    <v-row>
      <v-col
        v-for="category in availableCategories"
        :cols="numberOfCategoryCols"
      >
        <v-card
          v-bind="category"
          :color="category.color"
          class="category-card w-100 px-2 pb-2 rounded-lg"
        >
          <v-card-item class="text-center pr-0">
            <v-card-title class="d-flex justify-space-between align-center">
              {{ category.name }}
              <v-btn
                icon
                size="small"
                variant="text"
                class="rounded-lg"
                @click="deleteCategory(category.categoryId)"
              >
                <v-icon icon="fa:fa-solid fa-trash-can"></v-icon>
                <v-tooltip
                  activator="parent"
                  location="bottom"
                  open-delay="500"
                  class="text-center"
                >
                  Delete category
                </v-tooltip>
              </v-btn>
            </v-card-title>
          </v-card-item>
          <v-img :src="category.url" class="category-image rounded-lg"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
