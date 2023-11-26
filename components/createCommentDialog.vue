<script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '@/constants';

  const emit = defineEmits(['commentAdded']);

  const props = withDefaults(
    defineProps<{
      type: 'post' | 'comment';
      postId: number;
      parentCommentId?: number | null;
      title: string;
    }>(),
    { parentCommentId: null }
  );

  const showCreateCommentDialog = ref(false);
  const commentDialogContent = ref('');

  // TODO: Add validation

  const handleCreateComment = async () => {
    const comment: createCommentBody = {
      ParentCommentId: props.parentCommentId,
      PostId: props.postId,
      Content: commentDialogContent.value,
    };

    const response = await createComment(comment);
    if (!response.error) {
      showCreateCommentDialog.value = false;
      commentDialogContent.value = '';
      emit('commentAdded');
      toast.success('Comment has been created.', defaultToastOptions.success);
    } else {
      toast.error(
        'Error when trying to create comment.',
        defaultToastOptions.error
      );
    }
  };

  onMounted(() => {
    if (!checkLoginAndReroute()) {
      showCreateCommentDialog.value = false;
    }
  });
</script>

<template>
  <v-dialog
    v-model="showCreateCommentDialog"
    activator="parent"
    max-width="600"
  >
    <v-card class="px-10 py-6 rounded-lg">
      <div class="text-h6">
        <template v-if="type === 'post'">Comment on post:</template>
        <template v-else>Reply to comment:</template>
        <br />
        "{{ title }}"
      </div>

      <v-card-text class="px-0">
        <v-textarea
          v-model="commentDialogContent"
          variant="outlined"
        ></v-textarea>
      </v-card-text>
      <v-card-actions class="px-0">
        <v-btn
          variant="outlined"
          class="text-body-1"
          @click="showCreateCommentDialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          variant="outlined"
          color="cyan"
          class="text-body-1"
          @click="handleCreateComment"
        >
          Publish
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
