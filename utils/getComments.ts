export default async (postId: number) => {
  return genericFetch({
    method: 'GET',
    url: `http://localhost:5112/api/Post/GetComments/${postId}`,
  });
};
