export default async (loginData: loginData) => {
  const response = await genericFetch({
    method: 'POST',
    url: `https://localhost:7205/api/Account/login`,
    body: loginData,
  });

  if (response.data) {
    // If no error, then login was successful
    console.log('Login successful');
    return { data: response.data, error: null };
  } else {
    return { data: null, error: response.error, status: response.status };
  }
};
