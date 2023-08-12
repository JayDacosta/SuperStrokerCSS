import React from 'react';

function FontWeightSelector({ fontWeight, onFontWeightChange }) {
  return (
    <div>
      <label>
        Font Weight:
        <select value={fontWeight} onChange={e => onFontWeightChange(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="bolder">Bolder</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
          <option value="600">600</option>
          <option value="700">700</option>
          <option value="800">800</option>
          <option value="900">900</option>
        </select>
      </label>
    </div>
  );
}

export default FontWeightSelector;
