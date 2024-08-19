
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button, Typography } from '@mui/material';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import MoreEventsModal from './MoreEventsModal';

const Calendar = ({ currentMonth, onMonthChange, onDateClick, events, selectedCategory }) => {
  const start = startOfWeek(startOfMonth(currentMonth));
  const end = endOfWeek(endOfMonth(currentMonth));
  const navigate = useNavigate();

  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [moreEvents, setMoreEvents] = useState([]);

  const days = eachDayOfInterval({ start, end });

  const handlePrevMonth = () => {
    onMonthChange(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1));
  };

  const handleJump = (event) => {
    navigate(`/event/${event?.id}`);
  };

  const handleMoreClick = (events) => {
    setMoreEvents(events);
    setMoreModalOpen(true);
  };
  
  const renderEvents = (day, category) => {
    let dayEvents;

    if (category === "All") {
      dayEvents = events.filter(event =>
        format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      );
    } else {
      dayEvents = events.filter(event =>
        format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') &&
        event.category === category
      );
    }

    const displayedEvents = dayEvents.slice(0, 2);
    const moreCount = dayEvents.length - displayedEvents.length;


    return (
      <>
        {displayedEvents.map(event => (
          <Box
            key={event.id}
            sx={{
              backgroundColor: event.category === 'Work' ? '#1976d2' : '#4caf50',
              color: '#fff',
              margin: '4px 0',
              padding: '2px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => handleJump(event)}
          >
            {event.title}
          </Box>
        ))}
        {moreCount > 0 && (
          <Typography
            variant="caption"
            color="textSecondary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the date click event
              handleMoreClick(dayEvents.slice(2)); // Pass the remaining events
            }}
            sx={{ cursor: 'pointer' }}
          >
            +{moreCount} more
          </Typography>
        )}
      </>
    );
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" onClick={handlePrevMonth}>Previous</Button>
        <Typography variant="h6">{format(currentMonth, 'MMMM yyyy')}</Typography>
        <Button variant="contained" onClick={handleNextMonth}>Next</Button>
      </Box>
      <Grid container spacing={1}>
        {days.map(day => (
          <Grid item xs={4} sm={1.7} key={day}>
            <Box
              sx={{
                padding: 2,
                backgroundColor: format(day, 'MM-yyyy') !== format(currentMonth, 'MM-yyyy') ? '#f0f0f0' : '#fff',
                border: '1px solid #ddd',
                textAlign: 'center',
                cursor: format(day, 'MM-yyyy') === format(currentMonth, 'MM-yyyy') ? 'pointer' : 'default',
                minHeight: '100px',
                overflow: 'hidden'
              }}
              onClick={() => format(day, 'MM-yyyy') === format(currentMonth, 'MM-yyyy') && onDateClick(day)}
            >
              <Typography variant="body2">{format(day, 'd')}</Typography>
              {renderEvents(day, selectedCategory)}
            </Box>
          </Grid>
        ))}
      </Grid>

      <MoreEventsModal
        open={moreModalOpen}
        onClose={() => setMoreModalOpen(false)}
        events={moreEvents}
      />
    </Box>
  );
};

export default Calendar;

