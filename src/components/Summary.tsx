import { useState } from 'react';
import instance from '../axios/axiosInstance';
import { LandingFormData } from '../types';

type SummaryProps = {
  landingData: LandingFormData;
  onEditButtonClicked: () => void;
  onResetButtonClicked: () => void;
};

const Summary = ({
  landingData,
  onEditButtonClicked,
  onResetButtonClicked,
}: SummaryProps) => {
  const {
    arrivalTime,
    date,
    departure,
    departureTime,
    destination,
    model,
    paxNumber,
    pilotInCommand,
    registration,
    firstOfficer,
  } = landingData;
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const postLandingData = async () => {
    try {
      const result = await instance.post('/events', landingData);
      if (result.status === 201) {
        setSaveSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setSaveSuccess(false);
      setSaveError(true);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
        Report atterraggio
      </h2>
      <div className="flex flex-col gap-6 mt-8 md:sm-6 border-b border-t border-gray-200 py-8 dark:border-gray-700">
        <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
          <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Data di arrivo
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {new Date(date)
                .toISOString()
                .split('T')[0]
                .split('-')
                .reverse()
                .join('/')}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Marche aeromobile
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {registration}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Tipo aeromobile
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {model}
            </dd>
          </dl>
        </div>
        <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
          <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Pilota
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {pilotInCommand}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Copilota
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {firstOfficer}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              N° passeggeri
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {paxNumber}
            </dd>
          </dl>
        </div>
        <div className="grid print:grid-cols-3 md:grid-cols-3 gap-8 print:justify-between md:justify-between">
          <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Partenza
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {departure}
            </dd>
          </dl>
          <dl className="print:col-start-3 md:col-start-3">
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Destinazione
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {destination}
            </dd>
          </dl>
        </div>
        <div className="grid print:justify-between print:grid-cols-3 md:grid-cols-3 md:justify-between gap-8">
          <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Orario arrivo
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {arrivalTime}
            </dd>
          </dl>
          <dl className="print:col-start-3 md:col-start-3">
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Orario di partenza
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              {departureTime}
            </dd>
          </dl>
        </div>
        <div className="hidden print:grid print:justify-between print:grid-cols-3 md:grid-cols-3 md:justify-between gap-8">
          <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">
              Firma
            </dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400"></dd>
          </dl>
        </div>
      </div>

      {saveError && !saveSuccess && (
        <div className="mt-6 print:hidden flex flex-col md:flex-row gap-4 sm:gap-6">
          <p className="text-red-500">Errore salvataggio report</p>
        </div>
      )}

      <div className="mt-6 print:hidden flex flex-col md:flex-row gap-4 sm:gap-6">
        {!saveSuccess && (
          <button
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
        <button
          onClick={onEditButtonClicked}
          type="button"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Modifica
        </button>
        <button
          onClick={onResetButtonClicked}
          type="button"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Nuovo report
        </button>
      </div>
    </>
  );
};

export default Summary;
