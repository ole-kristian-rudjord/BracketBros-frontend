export default async (registerData: registerData) => {
  const response = await genericFetch({
    method: 'POST',
    url: 'https://localhost:7205/api/Account/register',
    body: registerData,
  });

  updateUserActivityState();
  return response;
};
