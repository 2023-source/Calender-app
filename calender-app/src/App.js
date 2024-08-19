// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import CalendarPage from "./pages/CalenderPage"
import EventDetailsPage from './pages/EventDetailsPage';
// import './styles/App.css'; // If needed

const App = () => {
  return (
    <EventProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
        </Routes>
      </Router>
    </EventProvider>
  );
};

export default App;
