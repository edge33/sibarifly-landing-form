import { useState } from 'react';
import EventForm from './components/EventForm/EventForm';
import Layout from './components/Layout';
import type { EventFormData } from './types';
import Summary from './components/Summary';

function App() {
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
    <Layout>
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
    </Layout>
  );
}

export default App;
