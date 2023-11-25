export default async (post: createPostBody) => {
  return genericFetch({
    url: 'http://localhost:5112/api/Post/createPost',
    method: 'POST',
    body: post,
  });
};
