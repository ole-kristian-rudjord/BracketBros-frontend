export default async (id: number) => {
  const response = await genericFetch({
    method: 'GET',
    url: `http://localhost:5112/api/Post/SavePost/${id}`, // TODO: implement in back-end
  });

  updateUserActivityState();
  return response;
};
