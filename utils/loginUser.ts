//const router = useRouter();

import genericFetch from './genericFetch';

export default async (loginData: loginData) => {
  const response = await genericFetch(
    'POST',
    `https://localhost:7205/api/Account/login`,
    loginData
  );

  if (response.data) {
    // If no error, then login was successful
    console.log('Login successful');
    return { data: response.data, error: null };
  } else {
    return { data: null, error: response.error, status: response.status };
  }
  // try {
  //   console.log('Trying to login');
  //   const response = await fetch(`https://localhost:7205/api/Account/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify(loginData),
  //   });

  //   if (response.ok) {
  //     const data = await response.text();
  //     getUserActivity();
  //     router.push('/user-activity');
  //     return { data, error: null };
  //   } else {
  //     return { data: null, error: response.status };
  //   }
  // } catch (error) {
  //   console.error('Error login:', error);
  //   return { data: null, error };
  // }
};
