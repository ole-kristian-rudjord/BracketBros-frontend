import genericFetch from "./genericFetch";

export default async (registerData: registerData) => {

  const response = await genericFetch('POST', 'https://localhost:7205/api/Account/register', registerData);

  if (response.error === null) {
    console.log('Register successful');
    return { data: response.data, error: null };
  } else {
    return { data: null, error: response.error };  
  }

  // try {
  //   console.log('Trying to login');
  //   const response = await fetch(
  //     `https://localhost:7205/api/Account/register`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify(registerData),
  //     }
  //   );

  //   if (response.ok) {
  //     const data = await response.text();
  //     return { data, error: null };
  //   } else {
  //     return { data: null, error: response.status };
  //   }
  // } catch (error) {
  //   console.error('Error login:', error);
  //   return { data: null, error };
  // }
};
