export default async () => {
  const { data } = await genericFetch({
    method: 'GET',
    url: 'https://localhost:7205/api/DashBoard/UserActivity',
  });

  const userActivity = useUserActivity();

  // FIXME: temp fix by using username because it the API returns login-page from backend, instead of null
  if (data.username) {
    userActivity.value = data;
  } else {
    userActivity.value = null;
  }
};
