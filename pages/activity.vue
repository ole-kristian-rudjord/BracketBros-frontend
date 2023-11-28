<script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '~/constants';

  useHead({
    title: 'My activity - BracketBros',
  });

  const userActivity = useUserActivity();

  const allPosts = useAllPosts();
  const createdPosts = ref<post[]>([]);
  const likedPosts = ref<post[]>([]);
  const savedPosts = ref<post[]>([]);

  const createdComments = ref<comment[]>([]);
  const likedComments = ref<comment[]>([]);
  const savedComments = ref<comment[]>([]);

  onMounted(async () => {
    await checkLoginAndReroute();

    if (userActivity.value?.username && allPosts.value) {
      createdPosts.value = allPosts.value.filter((p: post) =>
        userActivity.value?.posts.includes(p.id)
      );

      likedPosts.value = allPosts.value.filter((p: post) =>
        userActivity.value?.likedPosts.includes(p.id)
      );

      savedPosts.value = allPosts.value.filter((p: post) =>
        userActivity.value?.savedPosts.includes(p.id)
      );

      const response = await getUserComments();
      if (response.data) {
        createdComments.value = response.data.comments;
        likedComments.value = response.data.likedComments;
        savedComments.value = response.data.savedComments;
      } else {
        toast.error(
          'Error fetching comments from database.',
          defaultToastOptions.error
        );
      }
    }
  });
</script>

<template>
  <nuxt-layout name="centered-content">
    <v-expansion-panels variant="accordion" class="border rounded-lg">
      <v-expansion-panel bg-color="transparent" elevation="0">
        <v-expansion-panel-title>
          <v-icon
            icon="fa:fa-solid fa-file"
            size="small"
            color="green"
            class="mr-5"
          ></v-icon>
          <span class="text-body-1 font-weight-bold">My posts</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div
            v-if="createdPosts.length > 0"
            class="d-flex flex-column ga-4 pt-4 pb-2"
          >
            <post-component
              v-for="post in createdPosts"
              :key="post.id"
              :post="post"
            ></post-component>
          </div>
          <div v-else class="pt-2">You have not created any posts yet.</div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel bg-color="transparent" elevation="0">
        <v-expansion-panel-title>
          <v-icon
            icon="fa:fa-solid fa-heart"
            size="small"
            color="red"
            class="mr-5"
          ></v-icon>
          <span class="text-body-1 font-weight-bold">Liked posts</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div
            v-if="likedPosts.length > 0"
            class="d-flex flex-column ga-4 pt-4 pb-2"
          >
            <post-component
              v-for="post in likedPosts"
              :key="post.id"
              :post="post"
            ></post-component>
          </div>
          <div v-else class="pt-2">You have not liked any posts yet.</div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel bg-color="transparent" elevation="0">
        <v-expansion-panel-title>
          <v-icon
            icon="fa:fa-solid fa-bookmark"
            size="small"
            color="blue"
            class="mr-5"
          ></v-icon>
          <span class="text-body-1 font-weight-bold">Saved posts</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div
            v-if="savedPosts.length > 0"
            class="d-flex flex-column ga-4 pt-4 pb-2"
          >
            <post-component
              v-for="post in savedPosts"
              :key="post.id"
              :post="post"
            ></post-component>
          </div>
          <div v-else class="pt-2">You have not saved any posts yet.</div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="my-4"></div>

    <v-expansion-panels variant="accordion" class="border rounded-lg">
      <v-expansion-panel bg-color="transparent" elevation="0">
        <v-expansion-panel-title>
          <v-icon
            icon="fa:fa-solid fa-comment"
            size="small"
            color="green"
            class="mr-5"
          ></v-icon>
          <span class="text-body-1 font-weight-bold">My comments</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div
            v-if="createdComments.length > 0"
            class="d-flex flex-column ga-3 pt-4 pb-2"
          >
            <comment-component
              v-for="comment in createdComments"
              :key="comment.commentId"
              :comment="comment"
            ></comment-component>
          </div>
          <div v-else class="pt-2">You have not created any comments yet.</div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel bg-color="transparent" elevation="0">
        <v-expansion-panel-title>
          <v-icon
            icon="fa:fa-solid fa-heart"
            size="small"
            color="red"
            class="mr-5"
          ></v-icon>
          <span class="text-body-1 font-weight-bold">Liked comments</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div
            v-if="likedComments.length > 0"
            class="d-flex flex-column ga-3 pt-4 pb-2"
          >
            <comment-component
              v-for="comment in likedComments"
              :key="comment.commentId"
              :comment="comment"
            ></comment-component>
          </div>
          <div v-else class="pt-2">You have not liked any comments yet.</div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel bg-color="transparent" elevation="0">
        <v-expansion-panel-title>
          <v-icon
            icon="fa:fa-solid fa-bookmark"
            size="small"
            color="blue"
            class="mr-5"
          ></v-icon>
          <span class="text-body-1 font-weight-bold">Saved comments</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div
            v-if="savedComments.length > 0"
            class="d-flex flex-column ga-3 pt-4 pb-2"
          >
            <comment-component
              v-for="comment in savedComments"
              :key="comment.commentId"
              :comment="comment"
            ></comment-component>
          </div>
          <div v-else class="pt-2">You have not saved any comments yet.</div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </nuxt-layout>
</template>
