export default async (
  profilePicture: string,
  removeProfilePicture: boolean
) => {
  return genericFetch({
    method: 'POST',
    url: 'https://localhost:7205/api/Account/changeProfilePicture',
    body: {
      profilePicture: profilePicture,
      RemoveProfilePicture: removeProfilePicture,
    },
  });
};
