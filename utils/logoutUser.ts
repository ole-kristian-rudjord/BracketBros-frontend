export default async () => {
  const response = await genericFetch({
    method: 'GET',
    url: 'http://localhost:5112/api/Account/logout',
  });

  sessionStorage.clear();
  await updateUserActivityState();
  return response;
};
