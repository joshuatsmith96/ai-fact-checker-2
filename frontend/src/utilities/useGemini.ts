import { useState, useCallback } from 'react';

interface UseGeminiResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | null;
  loading: boolean;
  error: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateData: (_prompt: string) => Promise<any | null>;
  resetData: () => void;
}

export const useGemini = (): UseGeminiResult => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateData = useCallback(async (prompt: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    const apiURL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        let message = 'Failed to fetch Gemini response';
        if (contentType?.includes('application/json')) {
          const json = await response.json().catch(() => null);
          if (json?.error) {
            message = json.error;
          }
        }
        throw new Error(message);
      }

      if (contentType?.includes('application/json')) {
        const json = await response.json();
        setData(json); // store full JSON
        return json;
      } else {
        const raw = await response.text();
        throw new Error(`Unexpected response: ${raw}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // New resetData function
  const resetData = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, generateData, resetData };
};
