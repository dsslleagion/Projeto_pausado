import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes(value, isChecked) {
  return (
    <div>
      <Checkbox {...label} value={value} defaultChecked={isChecked}/>
    </div>
  );
}