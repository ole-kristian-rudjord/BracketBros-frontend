<script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '@/constants';

  useHead({
    title: 'Manage your account - BracketBros',
  });

  const router = useRouter();
  // const user = getSavedUserActivity();
  // if (!user) {
  //   router.push('/login'); // Redirect to login page if not logged in
  // }

  const passwordForm = ref(false);
  const passwordFormRef = ref();
  const oldPassword = ref('');
  const newPassword = ref('');
  const showOldPassword = ref(false);
  const showNewPassword = ref(false);
  const changePassword_isLoading = ref(false);

  const profilePicture = ref<File[]>([]);
  const changeProfilePicture_isLoading = ref(false);
  const removeProfilePicture_isLoading = ref(false);

  const rules = {
    required: (value: string) => !!value || 'Field is required',
    noPasswordMatch: () =>
      oldPassword.value !== newPassword.value || `Passwords cannot be the same`,
  };

  const changePassword = async () => {
    changePassword_isLoading.value = true;

    const response = await changeUserPassword(
      oldPassword.value,
      newPassword.value
    );

    if (response.data) {
      toast.success('Password has been changed.', defaultToastOptions.success);
    } else if (response.status === 422) {
      toast.error(
        'You are not authorized to change the password of this user.',
        defaultToastOptions.error
      );
    } else {
      toast.error(
        'An unexpected error occurred when trying to change password, please try again later.',
        defaultToastOptions.error
      );
    }

    passwordFormRef.value.reset();
    showOldPassword.value = false;
    showNewPassword.value = false;
    changePassword_isLoading.value = false;
  };

  const updateProfilePicture = async (picture: File[], isRemoving = false) => {
    const loadingState = isRemoving
      ? removeProfilePicture_isLoading
      : changeProfilePicture_isLoading;
    loadingState.value = true;

    const response = await changeProfilePicture(picture, isRemoving);

    if (response.data) {
      toast.success(
        `Profile picture has been ${isRemoving ? 'removed' : 'updated'}.`,
        defaultToastOptions.success
      );
    } else if (response.status === 422) {
      toast.error(
        'You are not authorized to update the profile picture of this user.',
        defaultToastOptions.error
      );
    } else {
      toast.error(
        'An unexpected error occurred, please try again later.',
        defaultToastOptions.error
      );
    }

    if (!isRemoving) {
      profilePicture.value = [];
    }
    loadingState.value = false;
  };

  const logout = () => {
    logoutUser();
    router.push('/login');
  };
</script>

<template>
  <nuxt-layout name="login-register">
    <v-form
      ref="passwordFormRef"
      v-model="passwordForm"
      @submit.prevent="changePassword"
    >
      <h1 class="d-flex align-center mb-5 text-body-1">
        <v-icon icon="fa:fa-solid fa-lock" size="x-small" class="mr-2"></v-icon>
        Password
      </h1>

      <v-text-field
        label="Current password"
        v-model="oldPassword"
        :type="showOldPassword ? 'text' : 'password'"
        :rules="[rules.required]"
        density="compact"
        variant="outlined"
        class="mb-1"
      >
        <template v-slot:append-inner>
          <v-icon
            :icon="
              showOldPassword
                ? 'fa:fa-solid fa-eye-slash'
                : 'fa:fa-solid fa-eye'
            "
            size="x-small"
            @click="showOldPassword = !showOldPassword"
          ></v-icon>
        </template>
      </v-text-field>

      <v-text-field
        label="New password"
        v-model="newPassword"
        :type="showNewPassword ? 'text' : 'password'"
        :rules="[rules.required, rules.noPasswordMatch()]"
        density="compact"
        variant="outlined"
      >
        <template v-slot:append-inner>
          <v-icon
            :icon="
              showNewPassword
                ? 'fa:fa-solid fa-eye-slash'
                : 'fa:fa-solid fa-eye'
            "
            size="x-small"
            @click="showNewPassword = !showNewPassword"
          ></v-icon>
        </template>
      </v-text-field>

      <v-btn
        type="submit"
        size="large"
        variant="tonal"
        block
        class="text-body-1"
        :disabled="!passwordForm"
        :loading="changePassword_isLoading"
      >
        Change password
      </v-btn>
    </v-form>

    <v-divider class="my-8"></v-divider>

    <h1 class="d-flex align-center mb-5 text-body-1">
      <v-icon icon="fa:fa-solid fa-image" size="x-small" class="mr-2"></v-icon>
      Profile Picture
    </h1>

    <v-file-input
      label="Select profile picture"
      v-model="profilePicture"
      accept="image/png, image/jpeg"
      density="compact"
      variant="outlined"
      prepend-icon=""
    >
    </v-file-input>

    <v-btn
      type="submit"
      size="large"
      variant="tonal"
      block
      class="text-body-1 mb-6"
      :disabled="profilePicture.length === 0"
      :loading="changeProfilePicture_isLoading"
      @click="updateProfilePicture(profilePicture, false)"
    >
      Change profile picture
    </v-btn>

    <v-btn
      type="submit"
      size="large"
      variant="tonal"
      block
      class="text-body-1"
      :loading="removeProfilePicture_isLoading"
      @click="updateProfilePicture([], true)"
    >
      Remove profile picture
    </v-btn>

    <v-divider class="my-8"></v-divider>

    <v-btn
      size="large"
      variant="tonal"
      block
      class="text-body-1"
      @click="logout"
    >
      Logout
    </v-btn>
  </nuxt-layout>
</template>
