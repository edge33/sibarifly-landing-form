import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

const useHttp = <T>(handler: (data: T) => AxiosPromise) => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{
    statusCode: number;
    message: string;
  } | null>(null);

  const trigger = useCallback(
    (data: T): Promise<T> => {
      return new Promise((resolve, reject) => {
        setPending(true);
        setResponse(null);
        handler(data)
          .then(response => {
            setData(response.data);
            setResponse(response);
            resolve(response.data);
            setError(null);
          })
          .catch((error: AxiosError<{ message: string }>) => {
            console.error(error);
            const errorToReturn = {
              statusCode: error.request?.status || 500,
              message: error.response?.data?.message || 'An error occurred',
            };
            reject(errorToReturn);
            setError(errorToReturn);
          })
          .finally(() => {
            setPending(false);
          });
      });
    },

    [handler],
  );

  return { trigger, data, pending, error, response };
};

export default useHttp;
