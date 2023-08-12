import React from 'react';

function ColorPicker({ label, color, onColorChange }) {
  return (
    <div>
      <label>
        {label}:
        <input 
          type="color" 
          value={color} 
          onChange={e => onColorChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export default ColorPicker;
