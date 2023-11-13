<script setup lang="ts">
  useHead({
    title: 'Browse posts - BracketBros',
  });

  const identifier = ref('');
  const password = ref('');
  const rememberMe = ref(false);

  const login = async () => {
    // Create an object with the login credentials
    const loginData = {
      Identifier: identifier.value,
      Password: password.value,
      RememberMe: rememberMe.value,
    };

    console.log(loginData);

    try {
      console.log('Trying to login');
      const response = await fetch(`https://localhost:7205/api/Account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if your endpoint requires it
        },
        credentials: 'include', // Add this line
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.text(); //= await response.json();
        alert(data);

        refreshUserActivity();
        return { data, error: null };
      } else {
        console.error('Error fetching posts:', response.text);
        alert(response.text);
        return { data: null, error: response.statusText };
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { data: null, error };
    }
  };
</script>

<template>
  <form @submit.prevent="login">
    <label>
      Email or username
      <input type="text" v-model="identifier" />
    </label>
    <label>
      Password
      <input type="password" v-model="password" />
    </label>
    <label>
      Remember me
      <input type="checkbox" v-model="rememberMe" />
    </label>
    <button type="submit">Log in</button>
  </form>
</template>
