import { useState } from 'react';
import LandingForm from './components/LandingForm';
import Layout from './components/Layout';
import type { LandingFormData } from './types';
import Summary from './components/Summary';

function App() {
  const [viewSummary, setViewSummary] = useState(false);
  const [landingData, setLandingData] = useState<LandingFormData>();

  const saveLandingData = (data: LandingFormData) => {
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
        <LandingForm
          onLandingDataFiled={saveLandingData}
          initialData={landingData}
        />
      )}
    </Layout>
  );
}

export default App;
