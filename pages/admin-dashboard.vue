<script setup lang="ts">
import {useDisplay} from 'vuetify/lib/framework.mjs';
import {toast} from 'vue3-toastify';
import {defaultToastOptions} from '~/constants';
import fileFetch from "~/utils/fileFetch";

useHead({
  title: 'Admin dashboard - BracketBros',
});

const display = useDisplay();

const numberOfCategoryCols = computed(() => {
  return display.mdAndUp.value ? 4 : display.smAndUp.value ? 6 : 12;
});

const availableCategories = ref<category[]>([]);
const availableTags = ref<tag[]>([]);


const showCreateCategoryDialog = ref(false);
const showEditCategoryDialog = ref(false);
const isLoading = ref(false);


const newCategoryColor = ref('#ffffff');
const newCategoryName = ref('');
const newCategoryURL = ref('');
const newCategoryFile = ref<File[]>([]);

const editCategoryColor = ref('#ffffff');
const editCategoryName = ref('');
const editCategoryURL = ref('');
const editCategoryFile = ref<File[]>([]);

const createNewCategory = async () => {

  const body = new FormData()

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
    toast.success(
        `Category has been created`,
        defaultToastOptions.success
    );
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

};

const populateEditCategoryDialog = (category: category) => {
  editCategoryColor.value = category.color;
  editCategoryName.value = category.name;
  editCategoryURL.value = category.url;
  showEditCategoryDialog.value = true;
};

const updateCategory = async () => {

  const body = new FormData()

  body.append('categoryId', editCategoryName.value);
  body.append('name', editCategoryName.value);
  body.append('url', editCategoryURL.value);
  body.append('color', editCategoryColor.value);
  body.append('file', editCategoryFile.value[0]);


  const response = await fileFetch({
    method: 'POST',
    url: 'http://localhost:5112/api/Dashboard/updateCategory',
    body: body,
  });

  if (response.status === 200) {
    toast.success(
        `Category has been updated`,
        defaultToastOptions.success
    );
  } else if (response.status === 422) {
    toast.error(
        'You are not authorized to update this category.',
        defaultToastOptions.error
    );
  } else {
    toast.error(
        'An unexpected error occurred, please try again later.',
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
    toast.success(
        `Category has been deleted`,
        defaultToastOptions.success
    );
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

  const getAllTags_response = await getAllTags();
  if (getAllTags_response.data) {
    // @ts-ignore
    availableTags.value = getAllTags_response.data.sort((a: tag, b: tag) =>
        a.name.localeCompare(b.name)
    );
  } else {
    toast.error(
        'Error fetching tags from the database.',
        defaultToastOptions.error
    );
  }
});
</script>

<template>
  <div
      style="max-width: 1000px"
      class="d-flex flex-column w-100 mx-auto px-4 py-16"
  >
    <div class="d-flex flex-column ga-6">
      <h1 class="text-h4 font-weight-bold">Admin Dashboard</h1>
      <p class="text-h6">This is a page used to update categories and tags</p>
    </div>


    <div>
      <v-btn>
        Create new category
      </v-btn>

      <v-dialog
          v-model="showCreateCategoryDialog"
          activator="parent"
          max-width="600"
      >
        <v-card class="px-10 py-6 rounded-lg">
          <v-form>
            <h3>New Category</h3>
            <v-text-field
                v-model="newCategoryName"
                label="Category name"
                outlined
                class="mb-6"
            ></v-text-field>
            <v-color-picker
                v-model="newCategoryColor"
                mode="hexa"
                class="mb-6"
            ></v-color-picker>
            <v-text-field
                v-model="newCategoryURL"
                label="Category URL"
                outlined
                class="mb-6"
            ></v-text-field>
            <v-file-input
                v-model="newCategoryFile"
                label="Category image"
                accept="image/png, image/jpeg, image/jpg"
                outlined
                class="mb-6">
            </v-file-input>
          </v-form>

          <v-card-actions class="px-0">
            <v-btn
                variant="outlined"
                class="text-body-1"
                @click="showCreateCategoryDialog = false"
            >
              Cancel
            </v-btn>

            <v-btn @click="createNewCategory"
                   variant="outlined"
                   color="cyan"
                   class="text-body-1"
                   :loading="isLoading"
                   :disabled="!newCategoryName && (!newCategoryURL || !newCategoryFile)"
            >Create new category
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <v-dialog
          v-model="showEditCategoryDialog"
          activator="parent"
          max-width="600"
      >
        <v-card class="px-10 py-6 rounded-lg">
          <v-form>
            <h3>Edit Category</h3>
            <v-text-field
                v-model="editCategoryName"
                label="Category name"
                outlined
                class="mb-6"
            ></v-text-field>
            <v-color-picker
                v-model="editCategoryColor"
                mode="hexa"
                class="mb-6"
            ></v-color-picker>
            <v-text-field
                v-model="editCategoryURL"
                label="Category URL"
                outlined
                class="mb-6"
            ></v-text-field>
            <v-file-input
                v-model="editCategoryFile"
                label="Category image"
                accept="image/png, image/jpeg, image/jpg"
                outlined
                class="mb-6">
            </v-file-input>
          </v-form>

          <v-card-actions class="px-0">
            <v-btn
                variant="outlined"
                class="text-body-1"
                @click="showCreateCategoryDialog = false"
            >
              Cancel
            </v-btn>

            <v-btn @click="updateCategory"
                   variant="outlined"
                   color="cyan"
                   class="text-body-1"
                   :loading="isLoading"
                   :disabled="!editCategoryName && (!editCategoryURL || !editCategoryFile)"
            >Create edit category
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      
    </div>
    <v-divider class="my-12"></v-divider>

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
          <v-card-item class="text-center">
            <v-card-title>{{ category.name }}</v-card-title>
            <v-btn
                icon
                size="small"
                variant="plain"
                class="rounded-lg">
              <v-icon icon="fa:fa-solid fa-trash-can"></v-icon>
              <v-tooltip activator="parent" location="start" open-delay="500" class="text-center">
                Delete category
              </v-tooltip>
            </v-btn>
            <v-btn @click="populateEditCategoryDialog(category)"
                icon
                size="small"
                variant="plain"
                class="rounded-lg"
            >
              <v-icon icon="fa:fa-solid fa-pen-to-square"></v-icon>
              <v-tooltip activator="parent" location="start" open-delay="500" class="text-center">
                Edit
              </v-tooltip>
            </v-btn>

          </v-card-item>
          <v-img :src="category.url" class="category-image rounded-lg"></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-12"></v-divider>

    <h2 class="mb-6 text-h4 font-weight-bold">Tags</h2>
    <div class="d-flex flex-wrap ga-2">
      <v-hover v-for="tag in availableTags" :key="tag.tagId">
        <template v-slot:default="{ isHovering, props }">
          <v-chip
              v-bind="props"
              size="x-large"
              :to="`/posts?tagId=${tag.tagId}`"
              class="tag-chip"
              :class="isHovering ? 'hover' : ''"
          >
            {{ tag.name }}

          </v-chip>
        </template>
      </v-hover>
    </div>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
}

.tag-chip {
  transition: transform 100ms ease;

  &.hover {
    transform: scale(1.075);
  }
}
</style>
