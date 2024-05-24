import { z, ZodType } from 'zod';
import { ARRIVAL, DEPARTURE, GA, ULM } from '../../../../types';

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

export const EventFormSchema: ZodType = z.object({
  dateTime: z.coerce
    .string({ required_error: 'Il campo è obbligatorio' })
    .refine(
      data_ => {
        return new Date(data_) <= new Date();
      },
      {
        message: 'Puoi registrare solo eventi avvenuti fino ad oggi',
      },
    ),
  // .transform(val => {
  // console.log('date ', val);

  // const date = new Date(val);
  // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  // })
  eventType: z.union([z.literal(ARRIVAL), z.literal(DEPARTURE)]),
  aircraftType: z.union([z.literal(GA), z.literal(ULM)]),

  aircraftRegistration: requiredString,
  aircraftModel: requiredString,
  pilotInCommand: requiredString,
  firstOfficer: z.string().optional(),
  paxNumber: z.coerce
    .number()
    .gte(0, 'Il valore minimo ammesso è zero')
    .lte(50, 'Il valore massimo ammesso è 50')
    .optional(),
  destination: requiredString,
  mobilePhone: z
    .string()
    .optional()
    .refine(
      val => {
        return !val || /^\+{0,1}\d+$/.test(val);
      },
      {
        message: 'Il numero di telefono deve essere composto da cifre',
      },
    ),
  emailAddress: z.union([
    z.literal(''),
    z.string().email({ message: 'Inserisci un indirizzo email valido' }),
  ]),
});
//   .superRefine(({ arrivalTime, departureTime }, ctx) => {
//     if (
//       new Date(`1970/01/01 ${arrivalTime}`) >
//       new Date(`1970/01/01 ${departureTime}`)
//     ) {
//       ctx.addIssue({
//         path: ['arrivalTime'],
//         code: z.ZodIssueCode.custom,
//         message:
//           'La data di partenza deve essere posteriore alla data di arrivo',
//       });

//       ctx.addIssue({
//         path: ['departureTime'],
//         code: z.ZodIssueCode.custom,
//         fatal: true,
//         message:
//           'La data di partenza deve essere posteriore alla data di arrivo',
//       });
//     }