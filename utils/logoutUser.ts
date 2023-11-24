export default async () => {
  const response = await genericFetch({
    method: 'GET',
    url: 'https://localhost:7205/api/Account/logout',
  });

  sessionStorage.clear(); // Remove all data from sessionStorage
  return response;
};
