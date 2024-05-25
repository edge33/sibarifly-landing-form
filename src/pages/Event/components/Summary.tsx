import instance from '../../../axios/axiosInstance';
import Spinner from '../../../components/Spinner';
import { EventData, EventFormData, STOP } from '../../../types';
import { useState } from 'react';

type SummaryProps = {
  landingData: EventFormData;
  onEditButtonClicked: () => void;
  onResetButtonClicked: () => void;
};

const EVENT_MAP = {
  ARRIVAL: 'Arrival',
  DEPARTURE: 'Departure',
  STOP: 'Fuel stop',
};

const Summary = ({
  landingData,
  onEditButtonClicked,
  onResetButtonClicked,
}: SummaryProps) => {
  const {
    departureDateTime,
    arrivalDateTime,
    aircraftType,
    emailAddress,
    eventType,
    mobilePhone,
    aircraftRegistration,
    departure,
    destination,
    aircraftModel,
    paxNumber,
    pilotInCommand,
    firstOfficer,
  } = landingData;

  const [saveSuccess, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  const postLandingData = async () => {
    if (pending) {
      return;
    }

    setPending(true);
    const events: EventData[] = [];
    setError(false);

    if (eventType === STOP) {
      events.push({
        dateTime: arrivalDateTime,
        eventType: 'ARRIVAL',
        aircraftType,
        aircraftRegistration,
        aircraftModel,
        pilotInCommand,
        firstOfficer,
        paxNumber,
        departure,
        destination: 'Sibari',
        mobilePhone,
        emailAddress,
      });
      events.push({
        dateTime: departureDateTime,
        eventType: 'DEPARTURE',
        aircraftType,
        aircraftRegistration,
        aircraftModel,
        pilotInCommand,
        firstOfficer,
        paxNumber,
        departure: 'Sibari',
        destination,
        mobilePhone,
        emailAddress,
      });
    } else {
      events.push({
        dateTime: arrivalDateTime,
        eventType,
        aircraftType,
        aircraftRegistration,
        aircraftModel,
        pilotInCommand,
        firstOfficer,
        paxNumber,
        departure,
        destination,
        mobilePhone,
        emailAddress,
      });
    }

    try {
      await Promise.all(events.map(event => instance.post('/events', event)));
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError(true);
    }

    setPending(false);
  };

  const isStop = eventType === STOP;

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 print:text-gray-900 dark:text-white sm:text-2xl flex gap-4">
        <img
          src="/SibaryFlyLogo.png"
          className="h-8 hidden print:block"
          alt="club-logo"
        />
        {EVENT_MAP[eventType]} log
      </h2>
      <div className="flex flex-col gap-6 mt-8 md:sm-6 border-b border-t border-gray-200 py-8 dark:border-gray-700">
        {isStop ? (
          <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
            <dl>
              <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
                Arrival date and time
              </dt>
              <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
                {new Date(arrivalDateTime).toLocaleString()}
              </dd>
            </dl>
            <dl />
            <dl>
              <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
                Departure date and time
              </dt>
              <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
                {new Date(departureDateTime).toLocaleString()}
              </dd>
            </dl>
          </div>
        ) : (
          <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
            <dl>
              <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
                Date and time
              </dt>
              <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
                {new Date(arrivalDateTime).toLocaleString()}
              </dd>
            </dl>
          </div>
        )}

        <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Registration mark
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {aircraftRegistration}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Aircraft model
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {aircraftModel}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Aircraft type
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {aircraftType}
            </dd>
          </dl>
        </div>

        <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Pilot in command
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {pilotInCommand}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              First office
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {firstOfficer}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Number of passengers
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {paxNumber}
            </dd>
          </dl>
        </div>
        <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Departure airfield
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {departure}
            </dd>
          </dl>
          <dl className="print:col-start-3 md:col-start-3">
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Destination airfield
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {destination}
            </dd>
          </dl>
        </div>

        <div className="grid print:justify-between print:grid-cols-3 md:grid-cols-3 md:justify-between gap-8">
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Phone number
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {mobilePhone}
            </dd>
          </dl>
          <dl className="print:col-start-3 md:col-start-3">
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Email address
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {emailAddress}
            </dd>
          </dl>
        </div>

        <div className="hidden print:grid print:justify-between print:grid-cols-3 md:grid-cols-3 md:justify-between gap-8">
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Signature
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400"></dd>
          </dl>
        </div>
      </div>

      {error && !saveSuccess && (
        <div className="mt-6 print:hidden flex flex-col md:flex-row gap-4 sm:gap-6">
          <p className="text-red-500">Log save error</p>
        </div>
      )}

      <div className="mt-6 print:hidden flex flex-col md:flex-row gap-4 sm:gap-6">
        {!saveSuccess && (
          <button
            disabled={pending}
            onClick={postLandingData}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Save log
          </button>
        )}
        {pending && (
          <div className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white">
            <Spinner />
          </div>
        )}

        {!pending && saveSuccess && (
          <button
            onClick={() => window.print()}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Print log
          </button>
        )}
        {!pending && !saveSuccess && (
          <button
            onClick={onEditButtonClicked}
            type="button"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-gray-900 print:text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Edit
          </button>
        )}
        {!pending && (
          <button
            onClick={onResetButtonClicked}
            type="button"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-gray-900 print:text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            New log
          </button>
        )}
      </div>
    </>
  );
};

export default Summary;
