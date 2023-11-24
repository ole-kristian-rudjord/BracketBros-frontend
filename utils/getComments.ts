export default async (postId: number) => {
  return genericFetch({
    method: 'GET',
    url: `https://localhost:7205/api/Post/GetComments/${postId}`,
  });
};
