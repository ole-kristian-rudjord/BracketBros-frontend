export default async () => {
  const response = await genericFetch({
    method: 'GET',
    url: 'https://localhost:7205/api/Account/logout',
  });
  if (response.error === null) {
    sessionStorage.clear(); // Remove all data from sessionStorage
    return { data: response.data, error: null };
  } else {
    return { data: null, error: response.error };
  }
};
