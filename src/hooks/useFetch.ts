import { useCallback, useEffect, useState } from 'react';

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
  refetch: () => void;
}

// Hook personalizado para obtener datos de una URL dada
export const useFetch = <T>(url: string): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);
  const [trigger, setTrigger] = useState(0); // Estado adicional para controlar el refetch

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    setLoading(true);

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const jsonData: T = await response.json();

      setData(jsonData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, trigger]);

  const refetch = () => {
    setTrigger((prev) => prev + 1); // Incrementar el trigger para forzar el refetch
  };

  return { data, loading, error, refetch };
};
