export default async (registerData: registerData) => {
  const response = await genericFetch({
    method: 'POST',
    url: 'https://localhost:7205/api/Account/register',
    body: registerData,
  });

  if (response.error === null) {
    console.log('Register successful');
    return { data: response.data, error: null };
  } else {
    return { data: null, error: response.error };
  }
};
