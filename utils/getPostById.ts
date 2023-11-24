export default async (id: number) => {
  return genericFetch({
    method: 'GET',
    url: `https://localhost:7205/api/Post/${id}`,
  });
};
