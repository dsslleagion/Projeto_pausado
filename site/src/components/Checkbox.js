import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes({value, isChecked, onChange}) {
  return (
    <div>
      <Checkbox {...label} value={value} defaultChecked={isChecked} onChange={(e) => onChange(e.target.value)}/>
    </div>
  );
}