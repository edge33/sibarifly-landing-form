import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ARRIVAL, EventFormData, GA, STOP } from '../../../../types';
import EventForm from './EventForm';
import { EventFormSchema } from './EventFormSchema';

const validEvent: EventFormData = {
  arrivalDateTime: '2026-10-23T10:00',
  departureDateTime: '2026-10-23T11:00',
  eventType: ARRIVAL,
  aircraftType: GA,
  aircraftRegistration: 'I-TEST',
  aircraftModel: 'Cessna',
  pilotInCommand: 'Test Pilot',
  firstOfficer: '',
  paxNumber: 2,
  departure: 'Rome',
  destination: 'Milan',
  mobilePhone: '',
  emailAddress: '',
};

describe('event validation', () => {
  it('coerces passenger counts and accepts empty optional contact fields', () => {
    const result = EventFormSchema.parse({ ...validEvent, paxNumber: '3' });
    expect(result.paxNumber).toBe(3);
    expect(result.emailAddress).toBe('');
  });

  it.each([-1, 51])('rejects an invalid passenger count: %s', paxNumber => {
    expect(
      EventFormSchema.safeParse({ ...validEvent, paxNumber }).success,
    ).toBe(false);
  });

  it('requires a departure and later departure time for a stop', () => {
    const result = EventFormSchema.safeParse({
      ...validEvent,
      eventType: STOP,
      departure: '',
      departureDateTime: '2026-10-23T09:00',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map(issue => issue.path[0])).toEqual([
        'departureDateTime',
        'departure',
      ]);
    }
  });

  it.each([
    { emailAddress: 'invalid' },
    { mobilePhone: 'letters' },
    { aircraftRegistration: '  ' },
  ])('rejects invalid fields: %o', fields => {
    expect(
      EventFormSchema.safeParse({ ...validEvent, ...fields }).success,
    ).toBe(false);
  });
});

describe('compiled event form', () => {
  it('updates conditional fields when the event type changes', async () => {
    const user = userEvent.setup();
    render(<EventForm onLandingDataFiled={vi.fn()} />);
    expect(screen.queryByLabelText('Departure airfield')).toBeTruthy();
    await user.click(screen.getByLabelText('Fuel stop'));
    expect(screen.getByLabelText('Departure airfield')).toBeTruthy();
    expect(screen.getByLabelText('Destination airfield')).toBeTruthy();
    await user.click(screen.getByLabelText('Arrival'));
    expect(screen.queryByLabelText('Destination airfield')).toBeNull();
  });

  it('submits parsed data with the arrival airfields mapped correctly', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <EventForm initialData={validEvent} onLandingDataFiled={onSubmit} />,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        ...validEvent,
        departure: 'Milan',
        destination: 'Sibari',
      }),
    );
  });
});
