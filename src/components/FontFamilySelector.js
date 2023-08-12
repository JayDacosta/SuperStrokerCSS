import React from 'react';

function FontFamilySelector({ onFontChange }) {
  return (
    <select onChange={e => onFontChange(e.target.value)}>
      <option value="Arial">Arial</option>
      <option value="Verdana">Verdana</option>
      <option value="Georgia">Georgia</option>
      {/* More font options can be added here */}
    </select>
  );
}

export default FontFamilySelector;
