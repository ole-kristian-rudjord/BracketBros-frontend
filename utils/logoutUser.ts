export default async () => {
  sessionStorage.clear();

  return await genericFetch({
    method: 'GET',
    url: 'http://localhost:5112/api/Account/logout',
  });
};
