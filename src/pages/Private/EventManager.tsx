import { useEffect } from 'react';
import instance from '../../axios/axiosInstance';
import useHttp from '../../hooks/useHttp';
// import TableControls from './components/TableControls';
// import TableFooter from './components/TableFooter';
import { EventData } from '../../types';
import TableRow from './components/TableRow';
import TableHeader from './components/TableHader';
const eventsHandler = () => instance.get('/events', { _retry: true });

const EventManager = () => {
  const { data, trigger } = useHttp<null, EventData[]>(eventsHandler);

  useEffect(() => {
    trigger(null);
  }, [trigger]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* Start coding here */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            {/* <TableControls /> */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <TableHeader />
                <tbody>
                  {data?.map(event => <TableRow key={event.id} {...event} />)}
                </tbody>
              </table>
            </div>
          </div>
          {/* <TableFooter /> */}
        </div>
      </section>
    </>
  );
};

export default EventManager;
