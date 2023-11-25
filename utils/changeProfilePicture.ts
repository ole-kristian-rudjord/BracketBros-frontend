export default async (
  profilePicture: File[],
  removeProfilePicture: boolean
) => {
  return genericFetch({
    method: 'POST',
    url: 'http://localhost:5112/api/Account/changeProfilePicture',
    body: {
      profilePicture: profilePicture,
      RemoveProfilePicture: removeProfilePicture,
    },
  });
};
