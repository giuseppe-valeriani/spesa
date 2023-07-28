import React, { useState } from 'react';

export default function Select({ filterList, handleSelect }) {
  const options = [
    { label: 'N', value: 0 },
    { label: 'G', value: 1 },
    { label: 'L', value: 2 },
    { label: 'T', value: 3 },
  ];

  const [state, setState] = useState(filterList);
  return (
    <select value={state} onChange={handleSelect} className="select">
      <option value="N">All</option>
      <option value="G">Generico</option>
      <option value="L">Lidl</option>
      <option value="T">Tesco</option>
    </select>
  );
}
