export default async (id: number) => {
  if (!checkLoginAndReroute()) {
    return;
  }

  const response = await genericFetch({
    method: 'GET',
    url: `http://localhost:5112/api/Post/LikeComment/${id}`,
  });

  await updateUserActivityState();
  return response;
};
