export default async () => {
  const { data } = await genericFetch({
    method: 'GET',
    url: 'http://localhost:5112/api/DashBoard/UserActivity',
  });

  if (data) {
    const userActivity = useUserActivity();
    userActivity.value = data;
  }
};
