export default () => {
  if (
    typeof sessionStorage !== 'undefined' &&
    sessionStorage.getItem('UserActivity') !== null
  ) {
    try {
      return JSON.parse(sessionStorage.getItem('UserActivity') as string);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the error or return a default value
      console.log("Trying to fetch UserActivity from server");
    }
  }
  console.log("Could not find any user UserActivity from session storage, trying to fetch UserActivity from server");
  return getUserActivity(false);
};
