const router = useRouter();

export default async (loginData: loginData) => {
  try {
    console.log('Trying to login');
    const response = await fetch(`https://localhost:7205/api/Account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.text();
      router.push('/user-activity');
      return { data, error: null };
    } else {
      return { data: null, error: response.status };
    }
  } catch (error) {
    console.error('Error login:', error);
    return { data: null, error };
  }
};
