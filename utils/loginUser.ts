export default async (loginData: loginData) => {
  return genericFetch({
    method: 'POST',
    url: `https://localhost:7205/api/Account/login`,
    body: loginData,
  });
};
