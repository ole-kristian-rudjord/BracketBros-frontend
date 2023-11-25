export default () => {
  const userActivity = useUserActivity();
  const router = useRouter();

  if (!userActivity.value) {
    router.replace('/login');
  }
};
