import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import EventModal from '../components/EventModal';
import { useEvent } from '../hooks/useEvent';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { events, deleteEvent } = useEvent();

  const event = events.find(event => event.id.toString() === id);

  if (!event) {
    return <Typography variant="body1">Event not found</Typography>;
  }

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate('/');
  };

  const handleEdit = () => {
    setModalOpen(true);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant='h4'> Event details</Typography>
      <Typography variant="body1"><strong>Title:</strong>{event.title}</Typography>
      <Typography variant="body1"><strong>Date:</strong> {event.date}</Typography>
      <Typography variant="body1"><strong>Description:</strong> {event.description}</Typography>
      <Typography variant="body1"><strong>Category:</strong> {event.category}</Typography>
      <Box mt={2}>
        <Button variant="contained" onClick={() => navigate('/')}>Back to Calendar</Button>
        <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ ml: 2 }}>Delete Event</Button>
        <Button variant="contained" color="primary" onClick={handleEdit} sx={{ ml: 2 }}>Edit Event</Button>
      </Box>
      {modalOpen && (
        <EventModal 
          event={event}
          event_type = "edit"
          date={event?.date}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default EventDetailsPage;
