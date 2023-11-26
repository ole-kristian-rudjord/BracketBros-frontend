export default async (id: number) => {
  const response = await genericFetch({
    method: 'GET',
    url: `http://localhost:5112/api/Post/LikePost/${id}`,
  });

  await updateUserActivityState();
  return response;
};
