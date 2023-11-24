export default async (
  profilePicture: File[],
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
