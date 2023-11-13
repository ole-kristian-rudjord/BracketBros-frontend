<script setup lang="ts">
  useHead({
    title: 'Log in - BracketBros',
  });

  const form = ref(false);
  const identifier = ref('');
  const password = ref('');
  const rememberMe = ref(false);

  const showPassword = ref(false);
  const isLoading = ref(false);
  const error = ref<null | 'unauthorized' | 'unexpectedError'>(null);

  const rules = {
    required: (value: string) => !!value || 'Field is required',
  };

  const login = async () => {
    isLoading.value = true;

    const loginData: loginData = {
      Identifier: identifier.value,
      Password: password.value,
      RememberMe: rememberMe.value,
    };

    const response = await loginUser(loginData);

    if (response.data) {
      const userActivity = await refreshUserActivity();
      console.log(userActivity);
      error.value = null;
    } else if (response.error === 401) {
      error.value = 'unauthorized';
    } else {
      error.value = 'unexpectedError';
    }

    isLoading.value = false;
  };
</script>

<template>
  <nuxt-layout name="login-register">
    <v-form v-model="form" @submit.prevent="login">
      <v-text-field
        label="Email or username"
        v-model="identifier"
        variant="outlined"
        :rules="[rules.required]"
        class="mb-3"
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        variant="outlined"
        :rules="[rules.required]"
      >
        <template v-slot:append-inner>
          <v-icon
            :icon="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
            size="x-small"
            @click="showPassword = !showPassword"
          ></v-icon>
        </template>
      </v-text-field>
      <v-checkbox
        label="Remember me"
        v-model="rememberMe"
        false-icon="fa-regular fa-square"
        true-icon="fa-regular fa-square-check"
        hide-details
        class="mb-5"
      ></v-checkbox>
      <v-btn
        type="submit"
        size="x-large"
        variant="tonal"
        block
        class="text-body-1"
        :disabled="!form"
        :loading="isLoading"
      >
        Log in
      </v-btn>
    </v-form>
    <nuxt-link to="/register" class="d-block mt-8 text-body-2">
      New here? Create an account.
    </nuxt-link>
    <v-alert
      v-if="error"
      color="error"
      icon="fa-solid fa-circle-exclamation"
      class="mt-6"
      :text="
        error === 'unauthorized'
          ? 'Email/username and password does not match with any existing user.'
          : 'Unexpected error when trying to log in, please try again later.'
      "
    ></v-alert>
  </nuxt-layout>
</template>
