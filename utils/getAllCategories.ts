export default async () => {
  return genericFetch({
    method: 'GET',
    url: 'https://localhost:7205/api/Post/GetCategories',
  });
};
