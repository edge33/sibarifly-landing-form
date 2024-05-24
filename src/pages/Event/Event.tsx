import { useState } from 'react';

import { EventFormData } from '../../types';
import Summary from './components/Summary';
import EventForm from './components/EventForm/EventForm';

function Event() {
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
    <>
      {landingData && viewSummary ? (
        <Summary
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
    </>
  );
}

export default Event;
