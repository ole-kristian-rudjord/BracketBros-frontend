import genericFetch from "./genericFetch";

export default async () => {

return genericFetch('GET', 'https://localhost:7205/api/Post/posts');

  // try {
  //   const response = await fetch('https://localhost:7205/api/Post/posts', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Add Authorization header if your endpoint requires it
  //     },
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     return { data, error: null };
  //   } else {
  //     console.error('Error fetching posts:', response.statusText);
  //     return { data: null, error: response.statusText };
  //   }
  // } catch (error) {
  //   console.error('Error fetching posts:', error);
  //   return { data: null, error };
  // }
};
