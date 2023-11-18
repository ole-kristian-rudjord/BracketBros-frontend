import genericFetch from "./genericFetch";

export default async () => {

const response = await genericFetch('https://localhost:7205/api/Account/logout', 'GET', null);

if (response.error === null) {
  sessionStorage.clear();  // Remove all data from sessionStorage 
  return { data: response.data, error: null };
} else {
  return { data: null, error: response.error };  
}
  // try {
  //   const response = await fetch('https://localhost:7205/api/Account/logout', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Add Authorization header if your endpoint requires it
  //     },
  //   });
  //   sessionStorage.clear();  // Remove all data from sessionStorage 
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
