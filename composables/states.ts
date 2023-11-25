export const useAllPosts = () => useState<post[]>('allPosts', () => []);
export const useUserActivity = () =>
  useState<UserActivity | null>('userActivity', () => null);
