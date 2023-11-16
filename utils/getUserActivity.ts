export default async (full? : boolean = false) => {
  try {
    const response = await fetch(
      `https://localhost:7205/api/DashBoard/UserActivity/${full ? 'full' : ''}`, // If full is set, return object with all data insted of ids
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if your endpoint requires it
        },
        credentials: 'include', // Add this line
      }
    );

    if (response.ok) {
      const data = await response.json();
  
      if (full === false) sessionStorage.setItem('UserActivity', JSON.stringify(data));

      return { data, error: null };
    } else {
      console.error('Error fetching posts:', response.statusText);
      return { data: null, error: response.statusText };
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { data: null, error };
  }
};
