type FetchOptions = {
  method: string;
  url: string;
  body?: object;
};

export default async ({ method, url, body }: FetchOptions) => {
  const isBodyAllowed = ['POST', 'PUT'].includes(method);

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...(isBodyAllowed && body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const response = await fetch(url, options);
    return await processResponse(response);
  } catch (error) {
    console.error(`Error fetching ${url} with ${method}: `, error);
    return { data: null, error, status: null };
  }
};

async function processResponse(response: Response) {
  const responseData = await response.text();
  try {
    const data = JSON.parse(responseData);
    return { data, error: null, status: response.status };
  } catch (error) {
    if (!response.ok) {
      console.error(`Error in response: `, responseData);
      return { data: null, error: responseData, status: response.status };
    }
    return { data: responseData, error: null, status: response.status };
  }
}
