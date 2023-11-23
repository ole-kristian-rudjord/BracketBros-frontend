<script setup lang="ts">
  import { useDisplay, useTheme } from 'vuetify/lib/framework.mjs';
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '@/constants';

  const display = useDisplay();
  const theme = useTheme();


  const showNavigationDrawer = ref(false);

  const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark
      ? 'customLightTheme'
      : 'customDarkTheme';
  };

  interface page {
    to: string;
    title: string;
    icon: string;
  }

  let user = getSavedUserActivity() ? getSavedUserActivity() : null;

  const pages: page[] = [
  {
    to: '/',
    title: 'Home',
    icon: 'fa-solid fa-house',
  },
  {
    to: '/posts',
    title: 'Posts',
    icon: 'fa-solid fa-comments',
  },
  {
    to: '/create-post',
    title: 'Create Post',
    icon: 'fa-solid fa-square-plus',
  }, 
  ...(user  // Check if logged in, if so, show activity page
    ? [
        {
          to: '/user-dashboard',
          title: `Dashboard`,
          icon: 'fa-solid fa-line-chart',
        },
        {
          to: '/manage-account',
          title: `Hello ${user.username}!`,
          icon: 'fa-solid fa-user',
        },
      ]
    : [ // If not logged in, show login and register
        {
          to: '/login',
          title: 'Log in',
          icon: 'fa-solid fa-right-to-bracket',
        },
        {
          to: '/register',
          title: 'Register',
          icon: 'fa-solid fa-user-plus',
        },
      ]),
];


  const allPosts = useAllPosts();

  onMounted(async () => {
    const { data } = await getAllPosts();
    if (data) {
      allPosts.value = data;
    } else {
      toast.error(
        'Error fetching posts from the database.',
        defaultToastOptions.error
      );
    }
  });
</script>

<template>
  <v-layout>
    <v-app-bar :height="display.mdAndUp.value ? '64' : '56'" elevation="3">
      <template v-slot:prepend v-if="display.smAndDown.value">
        <v-app-bar-nav-icon
          icon="fa-solid fa-bars"
          size="small"
          @click.stop="showNavigationDrawer = !showNavigationDrawer"
        ></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="flex-0-0 mx-auto mx-md-0 ml-md-5">
        <v-icon
          icon="fa-solid fa-laptop-code"
          size="small"
          color="cyan"
          class="ml-1 mr-2"
        ></v-icon>
        BracketBros
      </v-app-bar-title>

      <template v-if="display.mdAndUp.value">
        <v-divider vertical class="h-25 my-auto mx-5"></v-divider>

        <v-btn
          v-for="(page, index) in pages"
          :key="index"
          :to="page.to"
          class="nuxt-link-inline"
          :class="{ 'margin-right-2px': index !== pages.length - 1 }"
        >
          {{ page.title }}
        </v-btn>
      </template>

      <v-btn
        @click="toggleTheme"
        :icon="
          theme.current.value.dark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'
        "
        size="small"
        class="ml-md-auto"
      ></v-btn>
    </v-app-bar>

    <template v-if="display.smAndDown.value">
      <v-navigation-drawer v-model="showNavigationDrawer" temporary>
        <v-list nav>
          <v-list-item
            v-for="(page, index) in pages"
            :key="index"
            :value="page"
            :to="page.to"
          >
            <template v-slot:prepend>
              <v-icon :icon="page.icon" size="small" class="ml-1"></v-icon>
            </template>

            <v-list-item-title v-text="page.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </template>

    <v-main class="h-screen">
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped lang="scss">
  :deep(.v-toolbar__prepend) {
    margin-inline-end: unset;
  }

  .nuxt-link-inline {
    text-transform: none;
  }
  .margin-right-2px {
    margin-right: 2px;
  }
</style>
