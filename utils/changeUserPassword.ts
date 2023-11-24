export default async (oldPassword: string, newPassword: string) => {
  return genericFetch({
    method: 'POST',
    url: 'https://localhost:7205/api/Account/changePassword',
    body: {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
  });
};
