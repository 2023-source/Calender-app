
import React, { useState, useEffect } from 'react';
import { useEvent } from '../hooks/useEvent';
import '../styles/App.css';

const EventForm = ({ event = {}, date, onClose, event_type }) => {
  const { addEvent, editEvent } = useEvent();
  const [title, setTitle] = useState(event?.title || '');
  const [eventDate, setEventDate] = useState(event?.date || date || '');
  const [description, setDescription] = useState(event?.description || '');
  const [category, setCategory] = useState(event?.category || 'Work');

  console.log(eventDate)
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setEventDate(event.date ? formatLocalDate(event?.date) : ''); // Format for input
      setDescription(event.description);
      setCategory(event.category);
    } else if (date) {
      setEventDate(formatLocalDate(date));
       // Format for input
    }
  }, [event, date]);

  const formatLocalDate = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // Adjust for the local time zone
    return d.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (event?.id) { // Check if event is not null and has an id
      editEvent({ ...event, title, date: eventDate, description, category });
    } else {
      addEvent({ id: Date.now(), title, date: eventDate, description, category });
    }

    onClose();
  };


  return (
    <>

      <form onSubmit={handleSubmit} className='form-wrapper'>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      {
        event_type !== "add" ? 
        (
          <button type="submit">Update Event</button>
        ):
        (
          <button type="submit">Add Event</button>
        )
      }
      
    </form>
    </>
    
  );
};

export default EventForm;
