export const ARRIVAL = 'ARRIVAL';
export const DEPARTURE = 'DEPARTURE';
type EventType = typeof ARRIVAL | typeof DEPARTURE;

export const GA = 'GA';
export const ULV = 'ULV';

export type EventFormData = {
  dateTime: string;
  eventType: EventType;
  aircraftType: typeof GA | typeof ULV;
  aircraftRegistration: string;
  aircraftModel: string;
  pilotInCommand: string;
  firstOfficer?: string;
  paxNumber: number;

  departure: string;
  destination: string;

  mobilePhone: string;
  emailAddress: string;
};
