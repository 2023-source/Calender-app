import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MoreEventsModal = ({ open, onClose, events }) => {
  const navigate = useNavigate();

  const handleEventClick = (event) => {
    onClose(); // Close the modal
    navigate(`/event/${event.id}`); // Navigate to EventDetails page
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: '8px', maxWidth: '400px', margin: 'auto', marginTop: '20vh' }}>
        <Typography variant="h6" gutterBottom>More Events</Typography>
        {events.map(event => (
          <Box key={event.id} sx={{ marginBottom: 1 }}>
            <Button
              variant="text"
              onClick={() => handleEventClick(event)}
              fullWidth
              sx={{ textAlign: 'left' }}
            >
              {event.title}
            </Button>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default MoreEventsModal;
