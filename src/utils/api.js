const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

/**
 * Fetch data from an API endpoint
 * @param {string} url - The endpoint to fetch from
 * @param {Object} options - Fetch options
 * @returns {Promise} - Resolves with the fetched data
 */
export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Post data to an API endpoint
 * @param {string} url - The endpoint to post to
 * @param {Object} data - The data to post
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Resolves with the response data
 */
export async function postData(url, data, options = {}) {
  return fetchData(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
}
