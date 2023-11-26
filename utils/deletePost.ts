export default async (id: number) => {
  if (!(await checkLoginAndReroute())) {
    return;
  }

  const response = await genericFetch({
    url: `http://localhost:5112/api/Post/DeletePost/${id}`,
    method: 'POST',
  });

  await updateAllPosts();
  await updateUserActivityState();
  return response;
};
