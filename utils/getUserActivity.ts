export default () => {
  if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('UserActivity') !== null) {
    try {
      return JSON.parse(sessionStorage.getItem('UserActivity') as string);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the error or return a default value
      return null;
    }
  } else {
    // If not sessionStorage, make the user login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }
};

