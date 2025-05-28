import { useState } from 'react';

export default function useApi(baseUrl, token) {
  const [error, setError] = useState('');

  const request = async (endpoint, options = {}) => {
    setError('');
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error en la petición');
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const authRequest = (endpoint, options = {}) =>
    request(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

  return { request, authRequest, error };
}