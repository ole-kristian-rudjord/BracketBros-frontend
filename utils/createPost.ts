export default async (post: createPostBody) => {
  const response = await genericFetch({
    url: 'https://localhost:7205/api/Post/createPost',
    method: 'POST',
    body: post,
  });

  updateAllPosts();
  return response;
};
