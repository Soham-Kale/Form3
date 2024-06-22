import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';
import SummaryPage from './components/SummaryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SurveyForm />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
