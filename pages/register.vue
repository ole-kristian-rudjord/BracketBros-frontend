<script setup lang="ts">
  useHead({
    title: 'Register - BracketBros',
  });

  const form = ref(false);
  const email = ref('');
  const username = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const rememberMe = ref(false);

  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  const isLoading = ref(false);
  const error = ref<null | 'unexpectedError'>(null);

  const rules = {
    required: (value: string) => !!value || 'Field is required',
    username: (value: string) => {
      const usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
      return usernamePattern.test(value) || 'Please enter a valid username';
    },
    email: (value: string) => {
      const emailPattern =
        /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;
      return emailPattern.test(value) || 'Please enter a valid email';
    },
    passwordMatch: () =>
      password.value === confirmPassword.value || 'Passwords must match',
  };

  watch(password, () => {
    confirmPassword.value; // Trigger re-validation for the confirmPassword field
  });

  const register = async () => {
    isLoading.value = true;

    const registerData: registerData = {
      email: email.value,
      username: username.value,
      password: password.value,
    };

    const response = await registerUser(registerData);

    if (response.data) {
      console.log('success');
      // Set user
      error.value = null;
    } else {
      error.value = 'unexpectedError';
    }

    isLoading.value = false;
  };
</script>

<template>
  <nuxt-layout name="login-register">
    <v-form v-model="form" @submit.prevent="register">
      <v-text-field
        label="Email"
        v-model="email"
        variant="outlined"
        :rules="[rules.required, rules.email]"
        class="mb-3"
      ></v-text-field>
      <v-text-field
        label="Username"
        v-model="username"
        variant="outlined"
        :rules="[rules.required, rules.username]"
        class="mb-3"
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        variant="outlined"
        :rules="[rules.required]"
        class="mb-3"
      >
        <template v-slot:append-inner>
          <v-icon
            :icon="
              showPassword ? 'fa:fa-solid fa-eye-slash' : 'fa:fa-solid fa-eye'
            "
            size="x-small"
            @click="showPassword = !showPassword"
          ></v-icon>
        </template>
      </v-text-field>
      <v-text-field
        label="Confirm password"
        v-model="confirmPassword"
        :type="showConfirmPassword ? 'text' : 'password'"
        variant="outlined"
        :rules="[rules.required, rules.passwordMatch]"
      >
        <template v-slot:append-inner>
          <v-icon
            :icon="
              showConfirmPassword
                ? 'fa:fa-solid fa-eye-slash'
                : 'fa:fa-solid fa-eye'
            "
            size="x-small"
            @click="showConfirmPassword = !showConfirmPassword"
          ></v-icon>
        </template>
      </v-text-field>
      <v-checkbox
        label="Remember me"
        v-model="rememberMe"
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
        Register
      </v-btn>
    </v-form>
    <nuxt-link to="/login" class="d-block mt-8 text-body-2">
      Already have an account? Log in here.
    </nuxt-link>
  </nuxt-layout>
</template>
