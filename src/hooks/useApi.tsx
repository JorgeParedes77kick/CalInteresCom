import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

// Interfaz que define la estructura de la llamada API y el controlador de abortar
export interface UseApiCall<T> {
  call: Promise<AxiosResponse<T>>;
  controller: AbortController;
}

// Opciones para el hook useApi, incluyendo autoFetch y parámetros
type UseApiOptions<P> = {
  autoFetch?: boolean;
  params: P;
};

// Tipos para los datos y errores
type Data<T> = T | null;
type CustomError = Error | null;

// Interfaz que define el resultado del hook useApi
interface UseApiResult<T, P> {
  loading: boolean;
  data: Data<T>;
  error: CustomError;
  fetch: (param: P) => void;
}

// Hook personalizado para manejar llamadas API
export const useApi = <T, P>(
  apiCall: (param: P) => UseApiCall<T>,
  options?: UseApiOptions<P>,
): UseApiResult<T, P> => {
  // Estado para manejar la carga, datos y errores
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data<T>>(null);
  const [error, setError] = useState<CustomError>(null);

  // Función fetch para realizar la llamada API
  const fetch = useCallback(
    (param: P) => {
      const { call, controller } = apiCall(param);
      setLoading(true);

      call
        .then((response) => {
          setData(response.data);
          setError(null);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
      return () => controller.abort();
    },
    [apiCall],
  );

  // Efecto para manejar autoFetch si está habilitado
  useEffect(() => {
    if (options?.autoFetch) {
      return fetch(options.params);
    }
  }, [fetch, options?.autoFetch, options?.params]);

  // Retorna el estado y la función fetch
  return { loading, data, error, fetch };
};
