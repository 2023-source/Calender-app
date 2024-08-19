import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Calendar from '../components/Calender'
import EventFilter from '../components/EventFilter';
import EventModal from '../components/EventModal';
import { useEvent } from '../hooks/useEvent';

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const { events } = useEvent();

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.category === selectedCategory);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Calendar App</Typography>
      <EventFilter selectedCategory={selectedCategory} onFilterChange={setSelectedCategory} />
      <Calendar
        selectedCategory={selectedCategory}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        onDateClick={handleDateClick}
        events={filteredEvents}
      />
      {modalOpen && (
        <EventModal 
          event={selectedEvent}
          event_type="add"
          date={selectedDate}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default CalendarPage;
