import { useEffect } from 'react';
import instance from '../../axios/axiosInstance';
import useHttp from '../../hooks/useHttp';

const eventsHandler = () => instance.get('/events', { _retry: true });

const EventManager = () => {
  const { data, trigger } = useHttp(eventsHandler);

  useEffect(() => {
    trigger(null);
  }, [trigger]);

  console.log('data', JSON.stringify(data));

  return <h2>EventManager</h2>;
};

export default EventManager;
