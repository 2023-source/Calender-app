import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import EventForm from './EventForm';

const EventModal = ({ event, date, onClose, event_type }) => {
  // console.log(date)
  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ width: 400, margin: 'auto', padding: 4, backgroundColor: '#fff', borderRadius: 2 }}>
        <Typography variant="h6">{event ? 'Edit Event' : 'Add Event'}</Typography>
        <EventForm event={event} date={date} onClose={onClose} event_type={event_type} />
      </Box>
    </Modal>
  );
};

export default EventModal;
