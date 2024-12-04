import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";

interface FetcherResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: (url?: string, config?: AxiosRequestConfig) => Promise<void>;
}

export function useAxiosFetcher<T = any>(
  initialUrl?: string,
  initialConfig?: AxiosRequestConfig
): FetcherResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetcher = useCallback(
    async (url: string, config: AxiosRequestConfig = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const response: AxiosResponse<T> = await axios({
          url,
          ...config,
        });
        setData(response.data);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof AxiosError && err.response) {
          const { status, data } = err.response;
          if (status === 500) {
            setError("Internal Server Error");
          } else {
            setError(data.message || "An error occurred");
          }
        } else {
          setError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const refetch = useCallback(
    async (url?: string, config?: AxiosRequestConfig) => {
      const fetchUrl = url || initialUrl;
      if (!fetchUrl) {
        throw new Error("No URL provided for fetching data.");
      }
      await fetcher(fetchUrl, config || initialConfig || {});
    },
    [initialUrl, initialConfig, fetcher]
  );

  useEffect(() => {
    if (initialUrl) {
      refetch();
    }
  }, [initialUrl, refetch]);

  return { data, isLoading, error, refetch };
}
