export default async (id: number) => {
  const response = await genericFetch({
    method: 'GET',
    url: `https://localhost:7205/api/Post/LikePost/${id}`,
  });

  updateUserActivityState();
  return response;
};
