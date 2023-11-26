<script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '@/constants';

  useHead({
    title: 'Browse posts - BracketBros',
  });

  const allPosts = useAllPosts();
  const numberOfDisplayedPosts = ref(5);

  const showFilterSidebar = ref(false);
  const search = ref('');
  const liked = ref(false); // TODO:
  const commented = ref(false); // TODO:
  const saved = ref(false); // TODO:
  const categories = ref<{ category: category; selected: boolean }[]>([]);
  const tags = ref<{ tag: tag; selected: boolean }[]>([]);

  const filteredPosts = computed(() => {
    return allPosts.value.filter((post) => {
      // Convert search string to lower case
      const lowerCaseSearch = search.value.toLowerCase();

      // Check if the search string is present and matches the post's details, case-insensitively
      const matchesSearch = lowerCaseSearch
        ? post.title.toLowerCase().includes(lowerCaseSearch) ||
          post.content.toLowerCase().includes(lowerCaseSearch) ||
          post.category.name.toLowerCase().includes(lowerCaseSearch) ||
          post.tags.some((tag) =>
            tag.name.toLowerCase().includes(lowerCaseSearch)
          ) ||
          post.user.username.toLowerCase().includes(lowerCaseSearch)
        : true;

      // Determine if any category or tag is selected
      const isAnyCategorySelected = categories.value.some(
        (cat) => cat.selected
      );
      const isAnyTagSelected = tags.value.some((tag) => tag.selected);

      // Check if the category of the post is selected, only if any category is selected
      const matchesCategory = isAnyCategorySelected
        ? categories.value.some(
            (cat) =>
              cat.selected &&
              cat.category.categoryId === post.category.categoryId
          )
        : true;

      // Check if any of the post's tags are selected, only if any tag is selected
      const matchesTag = isAnyTagSelected
        ? post.tags.some((postTag) =>
            tags.value.some(
              (tag) => tag.selected && tag.tag.tagId === postTag.tagId
            )
          )
        : true;

      return matchesSearch && matchesCategory && matchesTag;
    });
  });

  const resetFilters = () => {
    // Reset search string
    search.value = '';

    // Unselect "My interactions"
    liked.value = false;
    commented.value = false;
    saved.value = false;

    // Unselect all categories
    categories.value.forEach((category) => {
      category.selected = false;
    });

    // Unselect all tags
    tags.value.forEach((tag) => {
      tag.selected = false;
    });

    toast.success('Filters have been reset', defaultToastOptions.success);
  };

  const isNearBottom = () => {
    const scrollY = window.scrollY;
    const visible = document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    return visible + scrollY >= pageHeight - 200;
  };

  const handleScroll = () => {
    if (
      numberOfDisplayedPosts.value < allPosts.value.length &&
      isNearBottom()
    ) {
      numberOfDisplayedPosts.value += 5;
    }
  };

  const route = useRoute();
  const router = useRouter();

  onMounted(async () => {
    const getAllCategories_response = await getAllCategories();
    if (getAllCategories_response) {
      categories.value = getAllCategories_response.map(
        (category: category) => ({
          category: category,
          selected: false,
        })
      );
    } else {
      toast.error(
        'Error fetching categories from database.',
        defaultToastOptions.error
      );
    }

    const getAllTags_response = await getAllTags();
    if (getAllTags_response.data) {
      tags.value = getAllTags_response.data.map((tag: tag) => ({
        tag: tag,
        selected: false,
      }));
    } else {
      toast.error(
        'Error fetching tags from database.',
        defaultToastOptions.error
      );
    }

    const categoryFromUrl = route.query.category;
    const tagFromUrl = route.query.tag;

    if (categoryFromUrl) {
      const categoryToSelect = categories.value.find(
        (c) =>
          c.category.name.toLowerCase() ===
          categoryFromUrl.toString().toLowerCase()
      );
      if (categoryToSelect) {
        categoryToSelect.selected = true;
      }
    }

    if (tagFromUrl) {
      const tagToSelect = tags.value.find(
        (t) => t.tag.name.toLowerCase() === tagFromUrl.toString().toLowerCase()
      );
      if (tagToSelect) {
        tagToSelect.selected = true;
      }
    }

    if (categoryFromUrl || tagFromUrl) {
      router.replace({
        path: route.path,
      });
    }

    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<template>
  <v-navigation-drawer rail permanent>
    <v-tooltip text="Filter and search posts" open-delay="500">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="fa:fa-solid fa-filter"
          :active="showFilterSidebar"
          variant="text"
          class="py-4 text-cyan"
          @click="showFilterSidebar = !showFilterSidebar"
        >
        </v-list-item>
      </template>
    </v-tooltip>
    <v-tooltip text="Reset filters" open-delay="500">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="fa:fa-solid fa-rotate-left"
          variant="text"
          class="py-4 text-cyan"
          @click="resetFilters"
        ></v-list-item>
      </template>
    </v-tooltip>
  </v-navigation-drawer>

  <v-navigation-drawer v-model="showFilterSidebar" width="320">
    <div class="d-flex flex-column pa-8">
      <v-text-field
        label="Search"
        v-model="search"
        variant="outlined"
        clearable
        hide-details
      ></v-text-field>

      <v-divider class="my-8"></v-divider>

      <div>My interactions</div>
      <v-checkbox
        label="Liked"
        v-model="liked"
        density="compact"
        hide-details
      ></v-checkbox>
      <v-checkbox
        label="Commented"
        v-model="commented"
        density="compact"
        hide-details
      ></v-checkbox>
      <v-checkbox
        label="Saved"
        v-model="saved"
        density="compact"
        hide-details
      ></v-checkbox>

      <v-divider class="my-8"></v-divider>

      <div>Categories</div>
      <v-checkbox
        v-for="category in categories"
        :key="category.category.categoryId"
        :label="category.category.name"
        v-model="category.selected"
        density="compact"
        hide-details
      ></v-checkbox>

      <v-divider class="my-8"></v-divider>

      <div>Tags</div>
      <v-checkbox
        v-for="tag in tags"
        :key="tag.tag.tagId"
        :label="tag.tag.name"
        v-model="tag.selected"
        density="compact"
        hide-details
      ></v-checkbox>
    </div>
  </v-navigation-drawer>

  <nuxt-layout name="centered-content">
    <post-component
      v-if="filteredPosts.length > 0"
      v-for="(post, index) in filteredPosts.slice(0, numberOfDisplayedPosts)"
      :key="index"
      :post="post"
      class="mb-8"
    ></post-component>
    <div v-else-if="allPosts.length > 0" class="text-center">
      No posts match these filters
    </div>
    <div v-else class="text-center">
      No posts available due to error when fetching posts
    </div>
  </nuxt-layout>
</template>
