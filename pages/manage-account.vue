<script setup lang="ts">
  import { toast } from 'vue3-toastify';
  import { defaultToastOptions } from '@/constants';

  useHead({
    title: 'Manage your account - BracketBros',
  });

  const router = useRouter();
  const user = getSavedUserActivity();
  if (!user) {
    router.push('/login'); // Redirect to login page if not logged in
  }

  const form = ref(false);

  const oldPassword = ref('');
  const newPassword = ref('');
  const showOldPassword = ref(false);
  const showNewPassword = ref(false);
  const changePassword_isLoading = ref(false);

  const profilePicture = ref('');
  const removeProfilePicture = ref(false);
  const changeProfilePicture_isLoading = ref(false);

  const isLoading = ref(false);
  const error = ref<null | 'unauthorized' | 'unexpectedError'>(null);

  const rules = {
    required: (value: string) => !!value || 'Field is required',
    noPasswordMatch: () =>
      oldPassword.value !== newPassword.value || `Passwords can't match`,
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

    changePassword_isLoading.value = false;
  };

  const profilePictureChange = async () => {
    // changePassword_isLoading.value = true;

    // const ProfilePictureModel = {
    //   ProfilePicture: profilePicture.value,
    //   RemoveProfilePicture: removeProfilePicture.value,
    // };

    // console.log(profilePicture.value);

    // console.log(ProfilePictureModel);
    // const response = await genericFetch({
    //   method: 'POST',
    //   url: 'https://localhost:7205/api/Account/changeProfilePicture',
    //   body: ProfilePictureModel,
    // });

    // if (response.data) {
    //   alert(response.data);
    //   error.value = null;
    // } else if (response.error === 422) {
    //   alert(response.data);
    //   error.value = 'unauthorized';
    // } else {
    //   alert(response.error);
    //   error.value = 'unexpectedError';
    // }

    changeProfilePicture_isLoading.value = true;

    const response = await changeProfilePicture(
      profilePicture.value,
      removeProfilePicture.value
    );

    if (response.data) {
      toast.success(
        'Profile picture has been updated.',
        defaultToastOptions.success
      );
    } else if (response.status === 422) {
      toast.error(
        'You are not authorized to update the profile picture of this user.',
        defaultToastOptions.error
      );
    } else {
      toast.error(
        'An unexpected error occurred when trying to update the profile picture, please try again later.',
        defaultToastOptions.error
      );
    }

    changeProfilePicture_isLoading.value = false;
  };

  const logout = () => {
    logoutUser();
    router.push('/login');
  };
</script>

<template>
  <nuxt-layout name="login-register">
    <v-form v-model="form" @submit.prevent="changePassword">
      <h2>Change password</h2>
      <v-text-field
        label="Current password"
        v-model="oldPassword"
        :type="showOldPassword ? 'text' : 'password'"
        variant="outlined"
        :rules="[rules.required]"
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
        variant="outlined"
        :rules="[rules.required, rules.noPasswordMatch()]"
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
        size="x-large"
        variant="tonal"
        block=""
        class="text-body-1"
        :disabled="!form"
        :loading="isLoading"
      >
        Change password
      </v-btn>
    </v-form>
    <v-alert
      v-if="error"
      color="error"
      icon="fa:fa-solid fa-circle-exclamation"
      class="mt-6"
      :text="
        error === 'unauthorized'
          ? 'Email/username and password does not match with any existing user.'
          : 'Unexpected error when trying to log in, please try again later.'
      "
    ></v-alert>
    <v-form
      v-model="form"
      @submit.prevent="profilePictureChange"
      enctype="multipart/form-data"
    >
      <h2>Change profile picture</h2>
      <v-file-input
        label="Profile picture"
        v-model="profilePicture"
        variant="outlined"
      ></v-file-input>
      <v-checkbox
        label="Remove profile picture"
        v-model="removeProfilePicture"
        false-icon="fa:fa-regular fa-square"
        true-icon="fa:fa-regular fa-square-check"
        hide-details
        class="mb-5"
      ></v-checkbox>
      <v-btn
        type="submit"
        size="x-large"
        variant="tonal"
        block=""
        class="text-body-1"
        :disabled="!form"
        :loading="isLoading"
      >
        Change profile picture
      </v-btn>
    </v-form>
    <v-btn
      size="x-large"
      variant="tonal"
      block=""
      class="text-body-1"
      @click="logout"
    >
      Logout
    </v-btn>
  </nuxt-layout>
</template>
