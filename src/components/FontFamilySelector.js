import React from 'react';

function FontFamilySelector({ onFontChange, fonts }) {
  return (
    <div>
      <label>Select Font Family: </label>
      <select onChange={(e) => onFontChange(e.target.value)}>
        <option value="">Select a font</option>
        {fonts.map((font, index) => (
          <option key={index} value={font.family}>
            {font.family}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FontFamilySelector;
