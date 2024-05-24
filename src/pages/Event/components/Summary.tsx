import instance from '../../../axios/axiosInstance';
import { EventData, EventFormData, STOP } from '../../../types';
import { useState } from 'react';

type SummaryProps = {
  landingData: EventFormData;
  onEditButtonClicked: () => void;
  onResetButtonClicked: () => void;
};

const EVENT_MAP = { ARRIVAL: 'arrivo', DEPARTURE: 'partenza', STOP: 'sosta' };

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
    if (pending) return;

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
        />{' '}
        Report {EVENT_MAP[eventType]}
      </h2>
      <div className="flex flex-col gap-6 mt-8 md:sm-6 border-b border-t border-gray-200 py-8 dark:border-gray-700">
        {isStop ? (
          <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
            <dl>
              <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
                Data e ora di arrivo
              </dt>
              <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
                {new Date(arrivalDateTime).toLocaleString()}
              </dd>
            </dl>
            <dl />
            <dl>
              <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
                Data e ora di partenza
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
                Data e ora
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
              Marche aeromobile
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {aircraftRegistration}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Modello aeromobile
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {aircraftModel}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Tipo aeromobile
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {aircraftType}
            </dd>
          </dl>
        </div>

        <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Pilota
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {pilotInCommand}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Copilota
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {firstOfficer}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              N° passeggeri
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {paxNumber}
            </dd>
          </dl>
        </div>
        <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Partenza
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {departure}
            </dd>
          </dl>
          <dl className="print:col-start-3 md:col-start-3">
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Destinazione
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {destination}
            </dd>
          </dl>
        </div>
        {/* <div className="grid print:justify-between print:grid-cols-3 md:grid-cols-3 md:justify-between gap-8">
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Orario arrivo
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {arrivalTime}
            </dd>
          </dl>
          <dl className="print:col-start-3 md:col-start-3">
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Orario di partenza
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {departureTime}
            </dd>
          </dl>
        </div> */}

        <div className="grid print:justify-between print:grid-cols-3 md:grid-cols-3 md:justify-between gap-8">
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Numero di telefono
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {mobilePhone}
            </dd>
          </dl>
          <dl className="print:col-start-3 md:col-start-3">
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Inidirizzo email
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400">
              {emailAddress}
            </dd>
          </dl>
        </div>

        <div className="hidden print:grid print:justify-between print:grid-cols-3 md:grid-cols-3 md:justify-between gap-8">
          <dl>
            <dt className="text-base font-medium text-gray-900 print:text-gray-900 dark:text-white">
              Firma
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 print:text-gray-500 dark:text-gray-400"></dd>
          </dl>
        </div>
      </div>

      {error && !saveSuccess && (
        <div className="mt-6 print:hidden flex flex-col md:flex-row gap-4 sm:gap-6">
          <p className="text-red-500">Errore salvataggio report</p>
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
            Salva report
          </button>
        )}
        {saveSuccess && (
          <button
            onClick={() => window.print()}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Stampa report
          </button>
        )}
        {!saveSuccess && (
          <button
            onClick={onEditButtonClicked}
            type="button"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-gray-900 print:text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Modifica
          </button>
        )}
        <button
          onClick={onResetButtonClicked}
          type="button"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-gray-900 print:text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Nuovo report
        </button>
      </div>
    </>
  );
};

export default Summary;
