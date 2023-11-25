export default async () => {
  sessionStorage.clear();

  return await genericFetch({
    method: 'GET',
    url: 'https://localhost:7205/api/Account/logout',
  });
};
