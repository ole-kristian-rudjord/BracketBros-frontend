export default async () => {
  const { data: categoriesData } = await genericFetch({
    method: 'GET',
    url: 'https://localhost:7205/api/Post/GetCategories',
  });

  categoriesData.forEach((category: { url: string }) => {
    category.url = category.url.replace('../', 'https://localhost:7205/');
  });

  return categoriesData;
};
