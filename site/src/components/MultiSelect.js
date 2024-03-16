import React from 'react';
import CreatableSelect from 'react-select/creatable';


export default function MultiSelect({options, set}) {
    return (
      <div>
        <CreatableSelect isMulti={true} options={options} onChange={(e) => set(e)}/>
      </div>
    );
  }

