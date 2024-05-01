import { Datepicker, DatepickerProps } from 'flowbite-react';

const LandingDatepicker = ({ onSelectedDateChanged }: DatepickerProps) => {
  return (
    <Datepicker
      labelTodayButton="Oggi"
      labelClearButton="Chiudi"
      maxDate={new Date()}
      weekStart={1}
      language="IT-it"
      onSelectedDateChanged={onSelectedDateChanged}
      theme={{
        root: {
          input: {
            field: {
              input: {
                base: 'w-full focus:!ring-primary-600 focus:!border-primary-600 dark:!focus:ring-primary-500 dark:focus:!border-primary-500',
              },
            },
          },
        },
        views: {
          years: {
            items: {
              item: {
                disabled:
                  'cursor-default bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white rounded-none',
                selected:
                  'text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800',
              },
            },
          },
          decades: {
            items: {
              item: {
                disabled:
                  'cursor-default bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white rounded-none',
                selected:
                  'text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800',
              },
            },
          },
          months: {
            items: {
              item: {
                disabled:
                  'cursor-default bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white rounded-none',
                selected:
                  'text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800',
              },
            },
          },
          days: {
            items: {
              item: {
                disabled:
                  'cursor-default bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white rounded-none',
                selected:
                  'text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800',
              },
            },
          },
        },
        popup: {
          root: {
            base: 'absolute top-10 z-50 block pt-2',
            inline: 'relative top-0 z-auto',
            inner:
              'inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700',
          },
          header: {
            base: '',
            title:
              'px-2 py-3 text-center font-semibold text-gray-900 dark:text-white',
            selectors: {
              base: 'mb-2 flex justify-between',
              button: {
                base: 'rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
                prev: '',
                next: '',
                view: '',
              },
            },
          },
          view: {
            base: 'p-1',
          },

          footer: {
            base: 'mt-2 flex space-x-2',
            button: {
              base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium bg',
              today:
                'text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800',
              clear:
                'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
            },
          },
        },
      }}
    />
  );
};

export default LandingDatepicker;
