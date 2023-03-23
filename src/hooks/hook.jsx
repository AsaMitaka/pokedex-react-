import { useState, useCallback } from 'react';

export default function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error could not fetch url ${url} ${response.status}}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    return setError(null);
  }, []);

  return { loading, error, request, clearError };
}
