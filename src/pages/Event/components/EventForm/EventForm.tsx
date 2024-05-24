import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EventFormSchema } from './EventFormSchema';
import { EventFormData, GA, ARRIVAL, DEPARTURE, STOP } from '../../../../types';

const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const anHourFromNow = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1);

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

type LandingFormProps = {
  onLandingDataFiled: (data: EventFormData) => void;
  initialData?: EventFormData;
};

const LandingForm = ({ onLandingDataFiled, initialData }: LandingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<EventFormData>({
    defaultValues: initialData
      ? initialData
      : {
          departureDateTime: anHourFromNow(),
          arrivalDateTime: getCurrentDateTime(),
          aircraftType: GA,
          eventType: ARRIVAL,
        },
    mode: 'onChange',
    resolver: zodResolver(EventFormSchema),
  });

  const eventType = getValues().eventType;

  const onSubmit = (data: EventFormData) => {
    const destination = data.destination;
    if (data.eventType === ARRIVAL) {
      data.destination = 'Sibari';
      data.departure = destination;
    } else if (data.eventType === DEPARTURE) {
      data.departure = 'Sibari';
    }

    onLandingDataFiled(data);
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Registra evento
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="col-span-2">
            <p className="block text-sm font-medium text-gray-900 dark:text-white">
              Evento *
            </p>
          </div>
          <div className="col-span-2 flex flex-col md:flex-row justify-between w-full gap-4 sm:gap-6">
            <div className="flex items-center">
              <input
                id="arrival-radio"
                type="radio"
                value="ARRIVAL"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                {...register('eventType')}
                onClick={() => {
                  setValue('eventType', 'ARRIVAL', { shouldValidate: true });
                }}
              />
              <label
                htmlFor="arrival-radio"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Arrivo
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="departure-radio"
                type="radio"
                value="DEPARTURE"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                {...register('eventType')}
                onClick={() => {
                  setValue('eventType', 'DEPARTURE', { shouldValidate: true });
                }}
              />
              <label
                htmlFor="departure-radio"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Partenza
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="stop-radio"
                type="radio"
                value="STOP"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                {...register('eventType')}
                onClick={() => {
                  setValue('eventType', 'STOP', { shouldValidate: true });
                }}
              />
              <label
                htmlFor="stop-radio"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Stop in giornata
              </label>
            </div>
          </div>

          {/* ARRIVAL DATE */}
          <div className="col-span-2">
            <label
              htmlFor="dateTime"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Data {eventType !== STOP ? 'evento' : 'arrivo'} *
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                max={getCurrentDateTime()}
                type="datetime-local"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('arrivalDateTime')}
              />
            </div>

            {errors?.arrivalDateTime && (
              <p className="pt-2.5 text-red-500">
                {errors.arrivalDateTime.message}
              </p>
            )}
          </div>

          {/* DEPARTURE DATE */}
          {eventType === STOP && (
            <div className="col-span-2">
              <label
                htmlFor="dateTime"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Data {eventType !== STOP ? 'evento' : 'partenza'} *
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  max={getCurrentDateTime()}
                  type="datetime-local"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('departureDateTime')}
                />
              </div>

              {errors?.departureDateTime && (
                <p className="pt-2.5 text-red-500">
                  {errors.departureDateTime.message}
                </p>
              )}
            </div>
          )}

          <div className="col-span-2">
            <p className="block text-sm font-medium text-gray-900 dark:text-white">
              Tipo di velivolo *
            </p>
          </div>
          <div className="flex items-center">
            <input
              id="ga-radio"
              type="radio"
              value="GA"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              {...register('aircraftType')}
            />
            <label
              htmlFor="ga-radio"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              GA
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="ulm-radio"
              type="radio"
              value="ULM"
              {...register('aircraftType')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="ulm-radio"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ULM
            </label>
          </div>
          <div className="col-span-2">
            {errors?.aircraftType && (
              <p className="pt-2.5 text-red-500">
                {errors.aircraftType.message}
              </p>
            )}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="aircraftRegistration"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Registrazione *
            </label>
            <input
              type="text"
              id="aircraftRegistration"
              className={`${errors.aircraftRegistration && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              placeholder="I-6897"
              {...register('aircraftRegistration')}
            />
            {errors?.aircraftRegistration && (
              <p className="pt-2.5 text-red-500">
                {errors.aircraftRegistration.message}
              </p>
            )}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="aircraftModel"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Aereo *
            </label>
            <input
              type="text"
              id="aircraftModel"
              className={`${errors.aircraftModel && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              placeholder="C-172"
              {...register('aircraftModel')}
              min={0}
            />
            {errors?.aircraftModel && (
              <p className="pt-2.5 text-red-500">
                {errors.aircraftModel.message}
              </p>
            )}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="pic"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pilota responsabile *
            </label>
            <input
              type="text"
              id="pic"
              className={`${errors.pilotInCommand && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              {...register('pilotInCommand')}
            />
            {errors?.pilotInCommand && (
              <p className="pt-2.5 text-red-500">
                {errors.pilotInCommand.message}
              </p>
            )}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="pic"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Copilota
            </label>
            <input
              type="text"
              id="firstOfficer"
              className={`${errors.firstOfficer && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              {...register('firstOfficer')}
            />
            {errors?.firstOfficer && (
              <p className="pt-2.5 text-red-500">
                {errors.firstOfficer.message}
              </p>
            )}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="pax"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Passeggeri *
            </label>
            <input
              type="number"
              id="pax"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="0"
              {...register('paxNumber')}
            />
            {errors?.paxNumber && (
              <p className="pt-2.5 text-red-500">{errors.paxNumber.message}</p>
            )}
          </div>

          {/* DEPARTURE */}
          {eventType === STOP && (
            <div className="col-span-2">
              <label
                htmlFor="departure"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Provenienza
              </label>
              <input
                type="text"
                id="departure"
                className={`${errors.departure && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                {...register('departure')}
              />
              {errors?.departure && (
                <p className="pt-2.5 text-red-500">
                  {errors.departure.message}
                </p>
              )}
            </div>
          )}

          {/* DESTINATION */}
          <div className="col-span-2">
            <label
              htmlFor="destination"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {eventType === ARRIVAL ? 'Provenienza' : 'Destinazione'}
            </label>
            <input
              type="text"
              id="destination"
              className={`${errors.destination && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              {...register('destination')}
            />
            {errors?.destination && (
              <p className="pt-2.5 text-red-500">
                {errors.destination.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Dettagli di contatto
            </h2>
            <p className="text-sm text-gray-900 dark:text-white">
              Aggiungi i tuoi contatti per rimanere informato sulle iniziative
              di SibariFly
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Indirizzo email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register('emailAddress')}
            />
            {errors?.emailAddress && (
              <p className="pt-2.5 text-red-500">
                {errors.emailAddress.message}
              </p>
            )}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="mobilePhone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Numero di telefono
            </label>
            <input
              type="tel"
              id="mobilePhone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register('mobilePhone')}
            />
            {errors?.mobilePhone && (
              <p className="pt-2.5 text-red-500">
                {errors.mobilePhone.message}
              </p>
            )}
          </div>
          {/* <div className="w-full">
            <label
              htmlFor="mobilePhone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Numero di telefono
            </label>
            <input
              type="tel"
              id="mobilePhone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register('mobilePhone')}
            />
            {errors?.mobilePhone && (
              <p className="pt-2.5 text-red-500">
                {errors.mobilePhone.message}
              </p>
            )}
          </div>

          {/* <div className="w-full">
            <label
              htmlFor="destination"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              A
            </label>
            <input
              type="text"
              id="destination"
              className={`${errors.destination && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              {...register('destination')}
            />
            {errors?.destination && (
              <p className="pt-2.5 text-red-500">
                {errors.destination.message}
              </p>
            )}
          </div> */}
          {/* <div className="w-full">
            <label
              htmlFor="arrival-time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ora di arrivo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="arrival-time"
                className={`${errors.arrivalTime && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                {...register('arrivalTime')}
                onChange={event => {
                  setValue('arrivalTime', event.target.value, {
                    shouldValidate: true,
                  });
                  console.log('cross set', getValues().departureTime);

                  setValue('departureTime', getValues().departureTime, {
                    shouldValidate: true,
                  });
                }}
              />
            </div>
            {errors?.arrivalTime &&
              errors?.arrivalTime.type !== z.ZodIssueCode.custom && (
                <p className="pt-2.5 text-red-500">
                  {errors.arrivalTime.message}
                </p>
              )}
          </div>

          <div className="w-full">
            <label
              htmlFor="departure-time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ora di partenza
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="departure-time"
                className={`${errors.departureTime && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                {...register('departureTime')}
                onChange={event => {
                  setValue('departureTime', event.target.value, {
                    shouldValidate: true,
                  });
                  setValue('arrivalTime', getValues().arrivalTime, {
                    shouldValidate: true,
                  });
                }}
              />
            </div>
            {errors.departureTime &&
              errors.departureTime.type !== z.ZodIssueCode.custom && (
                <p className="pt-2.5 text-red-500">
                  {errors.departureTime.message}
                </p>
              )}
          </div>
          <div className="sm:col-span-2">
            {errors.departureTime &&
              errors.departureTime.type === z.ZodIssueCode.custom && (
                <p className="pt-2.5 text-red-500">
                  {errors.departureTime.message}
                </p>
              )}
          </div> */}
        </div>
        <div className="mt-6 print:hidden flex flex-col md:flex-row gap-4 sm:gap-6">
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Conferma
          </button>
        </div>
      </form>
    </>
  );
};

export default LandingForm;
