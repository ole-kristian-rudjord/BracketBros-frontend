export default async (registerData: registerData) => {
  return genericFetch({
    method: 'POST',
    url: 'https://localhost:7205/api/Account/register',
    body: registerData,
  });
};
