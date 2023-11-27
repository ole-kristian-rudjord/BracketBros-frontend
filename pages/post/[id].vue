<script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '@/constants';

  const title = ref('BracketBros');

  useHead({
    title: title,
  });

  const route = useRoute();

  const post = ref<post | null>(null);
  const comments = ref<comment[] | null>(null);

  const updateComments = async () => {
    if (post.value) {
      const { data, error, status } = await getComments(post.value?.id);
      if (error && status !== 404) {
        console.error('Error fetching comments:', error);
        toast.error('Error fetching comments', defaultToastOptions.error);
      } else {
        comments.value = data;
      }
    }
  };

  const handleCommentAdded = () => {
    updateComments();
    if (post.value) {
      post.value.totalComments++;
    }
  };

  const handleDeletedComment = (deletedCommentId: number) => {
    if (comments.value) {
      comments.value = comments.value.filter(
        (comment) => comment.commentId !== deletedCommentId
      );
    }
    if (post.value) {
      post.value.totalComments--;
    }
  };

  watch(
    post,
    (newValue) => {
      if (newValue?.title) {
        title.value = `${newValue.title} - BracketBros`;
      }
    },
    { immediate: true }
  );

  onMounted(async () => {
    const postId = Number(route.params.id);

    if (!isNaN(postId)) {
      const { data: postData, error: postError } = await getPostById(postId);
      if (postError) {
        console.error('Error fetching post:', postError);
        toast.error('Error fetching post', defaultToastOptions.error);
      } else {
        post.value = postData;
        await updateComments();
      }
    } else {
      console.error('Invalid Post ID');
      toast.error('Invalid Post ID', defaultToastOptions.error);
    }
  });
</script>

<template>
  <nuxt-layout name="centered-content">
    <post-component
      v-if="post"
      :post="post"
      :expandContent="true"
      :preventHighlighting="true"
      @comment-added="handleCommentAdded"
    ></post-component>
    <div class="d-flex flex-column w-100 my-4" style="max-width: 700px">
      <comment-component
        v-for="comment in comments"
        :key="comment.commentId"
        :comment="comment"
        class="w-100 mb-4"
        @comment-reply-added="handleCommentAdded"
        @commentDeleted="handleDeletedComment(comment.commentId)"
      ></comment-component>
    </div>
  </nuxt-layout>
</template>
