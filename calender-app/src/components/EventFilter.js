import React from 'react';
import { Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const EventFilter = ({ selectedCategory, onFilterChange }) => {
  return (
    <Box mb={2}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="category-label">Filter by category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={selectedCategory}
          onChange={(e) => onFilterChange(e.target.value)}
          label="Filter by category"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default EventFilter;
