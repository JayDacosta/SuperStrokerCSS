import React from 'react';

function FontSizeSelector({ fontSize, onFontSizeChange }) {
  return (
    <div>
      <label>
        Font Size: {fontSize}px
        <input 
          type="range" 
          min="10" 
          max="100" 
          value={fontSize} 
          onChange={e => onFontSizeChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export default FontSizeSelector;
