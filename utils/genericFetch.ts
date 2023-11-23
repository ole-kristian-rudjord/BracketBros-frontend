
// Generic fetch function, it takes in method, an url  and object and returns the response
export default async (method: string, url: string, object: any = null) => {
  try {
    const options: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    // Add body to options if method is POST or PUT
    if (method === 'POST' || method === 'PUT') {
      options.body = JSON.stringify(object);
    }

    // Fetch data using options provided
    const response = await fetch(url, options);

    if (response.ok) {
        const rawData = await response.text();
      try { // Try to parse data as JSON
        const data = JSON.parse(rawData);
        return {data , error: null };
      } // If it fails, return raw data instead
      catch (error) {
        const data = rawData;
        return { data, error: null };
      }
    } else {
      console.error(`Error fetching ${url} using ${method}: `, response.statusText);
      return { data: await response.text(), error: response.status };
    }
  } catch (error) {
    console.error(`Error fetching ${url} using ${method}: `, error);
    return { data: null, error };
  }
};
