export default async () => {
  const { data } = await genericFetch({
    method: 'GET',
    url: 'https://localhost:7205/api/DashBoard/UserActivity',
  });

  if (data) {
    const userActivity = useUserActivity();
    userActivity.value = data;
  }
};
