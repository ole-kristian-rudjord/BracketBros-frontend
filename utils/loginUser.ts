export default async (loginData: loginData) => {
  const response = await genericFetch({
    method: 'POST',
    url: 'http://localhost:5112/api/Account/login',
    body: loginData,
  });

  updateUserActivityState();
  return response;
};
