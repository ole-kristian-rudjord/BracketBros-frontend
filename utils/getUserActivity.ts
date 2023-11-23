import genericFetch from "./genericFetch";


export default async (full: boolean = false ) => {


  const response = await genericFetch('GET', `https://localhost:7205/api/DashBoard/UserActivity/${full ? 'full' : ''}` );

  if (response.error === null) {
    if (!full) sessionStorage.setItem('UserActivity', JSON.stringify(response.data));
    return { data: response.data, error: null };
  } else {
    const error = "Unable to fetch UserActivity" ;
    return { data: null, error: error };  
  }


  // try {
  //   const response = await fetch(
  //     `https://localhost:7205/api/DashBoard/UserActivity/${full ? 'full' : ''}`, // If full is set, return object with all data insted of ids
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Add Authorization header if your endpoint requires it
  //       },
  //       credentials: 'include', // Add this line
  //     }
  //   );

  //   console.log("full fetch: " + full);

  //   if (response.ok) {
  //     const data = await response.json();
  
  //     if (full == false) sessionStorage.setItem('UserActivity', JSON.stringify(data));

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
