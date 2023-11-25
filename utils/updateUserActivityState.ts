export default async () => {
  const { data } = await genericFetch({
    method: 'GET',
    url: 'https://localhost:7205/api/DashBoard/UserActivity',
  });

  const userActivity = useUserActivity();

  if (data) {
    userActivity.value = data;
  } else {
    userActivity.value = null;
  }
};
