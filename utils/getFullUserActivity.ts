export default async () => {
  return await genericFetch({
    method: 'GET',
    url: 'https://localhost:7205/api/DashBoard/UserActivity/full',
  });
};
