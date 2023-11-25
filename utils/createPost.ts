export default async (post: createPostBody) => {
  return genericFetch({
    url: 'https://localhost:7205/api/Post/createPost',
    method: 'POST',
    body: post,
  });
};
