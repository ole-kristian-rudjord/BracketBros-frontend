<script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '~/constants';

  const testToast = (
    text: string,
    type: 'info' | 'success' | 'warning' | 'error'
  ) => {
    toast[type](text, defaultToastOptions[type]);
  };
</script>

<template>
  <v-btn @click="testToast('this is info', 'info')">Hello</v-btn>
  <div>testing normal</div>
  <div class="font-family--mono">testing mono</div>
  <v-btn icon="fa-brands fa-discord" variant="tonal"></v-btn>
</template>
