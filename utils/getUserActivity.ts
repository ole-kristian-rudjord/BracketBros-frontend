export default async (full: boolean = false) => {
  const response = await genericFetch({
    method: 'GET',
    url: `https://localhost:7205/api/DashBoard/UserActivity/${
      full ? 'full' : ''
    }`,
  });
  if (response.error === null) {
    if (!full)
      sessionStorage.setItem('UserActivity', JSON.stringify(response.data));
    return { data: response.data, error: null };
  } else {
    const error = 'Unable to fetch UserActivity';
    return { data: null, error: error };
  }
};
