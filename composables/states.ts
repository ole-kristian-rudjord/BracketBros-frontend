export const useAllPosts = () => useState<post[]>('allPosts', () => []);
