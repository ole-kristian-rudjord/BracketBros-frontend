<script setup lang="ts">
  useHead({
    title: 'Login - BracketBros',
  });

  const identifier = ref('');
  const password = ref('');
  const rememberMe = ref(false);

  const showPassword = ref(false);

  const isLoading = ref(false);

  const error = ref<null | 'unauthorized' | 'unexpectedError'>(null);

  const login = async () => {
    isLoading.value = true;

    const loginData = {
      Identifier: identifier.value,
      Password: password.value,
      RememberMe: rememberMe.value,
    };

    const response = await loginUser(loginData);

    if (response.data) {
      console.log('success');
      // Set user
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
  <div class="d-flex justify-center align-end h-75 w-100">
    <v-sheet width="440" class="mt-6 pa-12 rounded-lg">
      <v-alert
        v-if="error"
        color="error"
        icon="fa-solid fa-circle-exclamation"
        class="mb-6"
        :text="
          error === 'unauthorized'
            ? 'Email/username and password does not match with any existing user.'
            : 'Unexpected error when trying to sign in, please try again later.'
        "
      ></v-alert>
      <v-form @submit.prevent="login">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Email or username"
              v-model="identifier"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              hide-details
            >
              <template v-slot:append-inner>
                <v-icon
                  :icon="
                    showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
                  "
                  size="x-small"
                  @click="showPassword = !showPassword"
                ></v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              label="Remember me"
              v-model="rememberMe"
              false-icon="fa-regular fa-square"
              true-icon="fa-regular fa-square-check"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col cols="12">
            <v-btn
              type="submit"
              size="x-large"
              variant="tonal"
              block
              class="text-body-1"
              :loading="isLoading"
            >
              Sign in
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </div>
</template>
