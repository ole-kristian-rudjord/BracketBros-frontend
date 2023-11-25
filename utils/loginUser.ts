export default async (loginData: loginData) => {
  const response = await genericFetch({
    method: 'POST',
    url: 'https://localhost:7205/api/Account/login',
    body: loginData,
  });

  updateUserActivityState();
  return response;
};
