<script setup lang="ts">
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

  const oldShowPassword = ref(false);
  const newShowPassword = ref(false);

  const profilePicture = ref('');
  const removeProfilePicture = ref(false);

  const isLoading = ref(false);
  const error = ref<null | 'unauthorized' | 'unexpectedError'>(null);

  const rules = {
    required: (value: string) => !!value || 'Field is required',
    noPasswordMatch: () =>
      oldPassword.value !== newPassword.value || `Passwords can't match`,
  };

  const changePassword = async () => {
    isLoading.value = true;

    const ChangePasswordModel: object = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    };

    const response = await genericFetch({
      method: 'POST',
      url: 'https://localhost:7205/api/Account/changePassword',
      body: ChangePasswordModel,
    });

    if (response.data) {
      alert(response.data);
      error.value = null;
    } else if (response.status === 422) {
      alert(response.error);
      error.value = 'unauthorized';
    } else {
      alert(response.error);
      error.value = 'unexpectedError';
    }

    isLoading.value = false;
  };

  const profilePictureChange = async () => {
    isLoading.value = true;

    const ProfilePictureModel: object = {
      ProfilePicture: profilePicture.value,
      RemoveProfilePicture: removeProfilePicture.value,
    };

    console.log(profilePicture.value);

    console.log(ProfilePictureModel);
    const response = await genericFetch({
      method: 'POST',
      url: 'https://localhost:7205/api/Account/changeProfilePicture',
      body: ProfilePictureModel,
    });
    if (response.data) {
      alert(response.data);
      error.value = null;
    } else if (response.error === 422) {
      alert(response.data);
      error.value = 'unauthorized';
    } else {
      alert(response.error);
      error.value = 'unexpectedError';
    }
    isLoading.value = false;
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
        :type="oldShowPassword ? 'text' : 'password'"
        variant="outlined"
        :rules="[rules.required]"
      >
        <template v-slot:append-inner>
          <v-icon
            :icon="
              oldShowPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
            "
            size="x-small"
            @click="oldShowPassword = !oldShowPassword"
          ></v-icon>
        </template>
      </v-text-field>
      <v-text-field
        label="New password"
        v-model="newPassword"
        :type="newShowPassword ? 'text' : 'password'"
        variant="outlined"
        :rules="[rules.required, rules.noPasswordMatch()]"
      >
        <template v-slot:append-inner>
          <v-icon
            :icon="
              newShowPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
            "
            size="x-small"
            @click="newShowPassword = !newShowPassword"
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
      icon="fa-solid fa-circle-exclamation"
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
        false-icon="fa-regular fa-square"
        true-icon="fa-regular fa-square-check"
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
