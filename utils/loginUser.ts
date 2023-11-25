export default async (loginData: loginData) => {
  const response = await genericFetch({
    method: 'POST',
    url: `https://localhost:5112/api/Account/login`,
    body: loginData,
  });

  await updateUserActivityState();
  return response;
};
