export default async () => {
  const { data } = await genericFetch({
    method: 'GET',
    url: 'http://localhost:5112/api/DashBoard/UserActivity',
  });

  const userActivity = useUserActivity();

  // FIXME: temp fix by using username because it is the API returns login-page from backend, instead of null
  if (data.username) {
    userActivity.value = data;
  } else {
    userActivity.value = null;
  }
};
