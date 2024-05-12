import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
// import LandingDatepicker from './LandingDatePicker';
import type { LandingFormData } from '../types';

const requiredString = z
  .string()
  .trim()
  .min(1, { message: 'Questo campo è obbligatorio' });

// .refine(
//   time_ => {
//     const currentDate_ = new Date();
//     const currentTime = `${currentDate_.getHours()}:${currentDate_.getMinutes()}`;
//     return (
//       new Date(`1970/01/01 ${time_}`) <= new Date(`1970/01/01 ${currentTime}`)
//     );
//   },
//   {
//     message: "L'ora di arrivo non può essere posteriore all'ora attuale",
//   },
// );

const LandingFormSchema: ZodType = z
  .object({
    date: z.coerce.string({ required_error: 'Il campo è obbligatorio' }).refine(
      data_ => {
        return new Date(data_) <= new Date();
      },
      {
        message: 'Puoi registrare solo atterraggi avvenuti fino ad oggi',
      },
    ),
    // .transform(val => {
    // console.log('date ', val);

    // const date = new Date(val);
    // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    // })
    registration: requiredString,
    model: requiredString,
    pilotInCommand: requiredString,
    firstOfficer: z.string().optional(),
    paxNumber: z.coerce
      .number()
      .gte(0, 'Il valore minimo ammesso è zero')
      .lte(50, 'Il valore massimo ammesso è 50')
      .optional(),
    departure: requiredString,
    destination: requiredString,
    arrivalTime: requiredString,
    departureTime: requiredString,
  })
  .superRefine(({ arrivalTime, departureTime }, ctx) => {
    if (
      new Date(`1970/01/01 ${arrivalTime}`) >
      new Date(`1970/01/01 ${departureTime}`)
    ) {
      ctx.addIssue({
        path: ['arrivalTime'],
        code: z.ZodIssueCode.custom,
        message:
          'La data di partenza deve essere posteriore alla data di arrivo',
      });

      ctx.addIssue({
        path: ['departureTime'],
        code: z.ZodIssueCode.custom,
        fatal: true,
        message:
          'La data di partenza deve essere posteriore alla data di arrivo',
      });
    }
  });

const getTime = (offset = 0) => {
  const date = new Date(new Date().getTime() + offset * 60000);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

const time = getTime();
const timePlusTen = getTime(10);

type LandingFormProps = {
  onLandingDataFiled: (data: LandingFormData) => void;
  initialData?: LandingFormData;
};

const LandingForm = ({ onLandingDataFiled, initialData }: LandingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<LandingFormData>({
    defaultValues: initialData
      ? initialData
      : {
          date: new Date().toISOString().split('T')[0],
          arrivalTime: time,
          departureTime: timePlusTen,
        },
    mode: 'onChange',
    resolver: zodResolver(LandingFormSchema),
  });

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Registra atterraggio/decollo
      </h2>
      <form onSubmit={handleSubmit(onLandingDataFiled)}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Data atterraggio
            </label>

            {/* <LandingDatepicker
              onSelectedDateChanged={data =>
                setValue('date', data, {
                  shouldValidate: true,
                })
              }
            /> */}
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
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('date')}
              />
            </div>

            {errors?.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="registration"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Registration
            </label>
            <input
              type="text"
              id="registration"
              className={`${errors.registration && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              placeholder="I-6897"
              {...register('registration')}
            />
            {errors?.registration && (
              <p className="pt-2.5 text-red-500">
                {errors.registration.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="plane"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Aereo
            </label>
            <input
              type="text"
              id="plane"
              className={`${errors.model && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              placeholder="C-172"
              {...register('model')}
              min={0}
            />
            {errors?.model && (
              <p className="pt-2.5 text-red-500">{errors.model.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="pic"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pilota responsabile
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

          <div className="sm:col-span-2">
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

          <div className="w-full">
            <label
              htmlFor="pax"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Passeggeri
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

          <div className="w-full" />

          <div className="w-full sm:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Provenienza
            </h2>
          </div>

          <div className="w-full">
            <label
              htmlFor="departure"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Da
            </label>
            <input
              type="text"
              id="departure"
              className={`${errors.departure && 'border-red-600 ring-red-600 dark:border-red-600 darkring-red-600'}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              placeholder=""
              {...register('departure')}
            />
            {errors?.departure && (
              <p className="pt-2.5 text-red-500">{errors.departure.message}</p>
            )}
          </div>

          <div className="w-full">
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
          </div>
          <div className="w-full">
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
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Conferma
        </button>
      </form>
    </>
  );
};

export default LandingForm;
