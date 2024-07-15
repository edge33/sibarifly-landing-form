import { useEffect, useState } from 'react';

import { EventData, EventFormData } from '../../types';
import EventSummary from './components/EventSummary';
import EventForm from './components/EventForm/EventForm';
import instance from '../../axios/axiosInstance';
import useHttp from '../../hooks/useHttp';
import { useParams } from 'react-router-dom';
import mapEventDataToFormData from '../../utils/mapEventDataToFormData';

const eventsHandler = (eventId: string) =>
  instance.get(`/events/${eventId}`, { _retry: true });

function Event() {
  const params = useParams();
  const eventId = params.eventId;

  const { data, trigger } = useHttp<string, EventData>(eventsHandler);

  useEffect(() => {
    if (data) {
      setLandingData(mapEventDataToFormData(data));
      setViewSummary(true);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      if (eventId) {
        await trigger(eventId);
      }
    })();
  }, [eventId, trigger]);

  const [viewSummary, setViewSummary] = useState(false);
  const [landingData, setLandingData] = useState<EventFormData>();

  const saveLandingData = (data: EventFormData) => {
    setLandingData(data);
    setViewSummary(true);
  };

  const onEditButtonClicked = () => {
    setViewSummary(false);
  };

  const onResetButtonClicked = () => {
    setLandingData(undefined);
    setViewSummary(false);
  };

  return (
    <div>
      {landingData && viewSummary ? (
        <EventSummary
          landingData={landingData}
          onEditButtonClicked={onEditButtonClicked}
          onResetButtonClicked={onResetButtonClicked}
        />
      ) : (
        <EventForm
          onLandingDataFiled={saveLandingData}
          initialData={landingData}
        />
      )}
    </div>
  );
}

export default Event;
