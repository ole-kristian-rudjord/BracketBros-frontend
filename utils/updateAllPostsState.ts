import { toast } from 'vue3-toastify';
import { defaultToastOptions } from '@/constants';

export default async () => {
  const allPosts = useAllPosts();

  const getAllPosts_response = await getAllPosts();
  if (getAllPosts_response.data) {
    allPosts.value = getAllPosts_response.data;
  } else {
    toast.error(
      'Error fetching posts from the database.',
      defaultToastOptions.error
    );
  }
};
