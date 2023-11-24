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
    const responseText = await response.text();
    if (response.ok) {
      // Try to parse data as JSON else return it as text
      try {
        // Try to parse data as JSON
        const json = JSON.parse(responseText);
        return { data: json, error: null, status: response.status };
      } catch (error) {
        // If it fails, return raw data instead
        return { data: responseText, error: null, status: response.status };
      }
    } else {
      console.error(
        `Error fetching ${url} using ${method}: `,
        response.statusText
      );
      return { data: null, error: responseText, status: response.status };
    }
  } catch (error) {
    console.error(`Error fetching ${url} using ${method}: `, error);
    return { data: null, error, status: null };
  }
};
