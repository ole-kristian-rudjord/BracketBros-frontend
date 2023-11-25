export default async (registerData: registerData) => {
  return genericFetch({
    method: 'POST',
    url: 'http://localhost:5112/api/Account/login',
    body: registerData,
  });
};