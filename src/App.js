import React, { useState, useEffect } from 'react';
import LivePreview from './components/LivePreview';
import FontFamilySelector from './components/FontFamilySelector';
import FontSizeSelector from './components/FontSizeSelector';
import FontWeightSelector from './components/FontWeightSelector';
import ColorPicker from './components/ColorPicker';



function App() {
  const [fontSize, setFontSize] = useState(20); // New state for font size
  const [fontColor, setFontColor] = useState('#000000');  // Default color of black
  const [fontWeight, setFontWeight] = useState('normal');  // Default font weight
  const [strokeColor, setStrokeColor] = useState('#000000');  // Default stroke color of black
  const [strokeSize, setStrokeSize] = useState(1);  // Default stroke size of 1
  const [generatedCSS, setGeneratedCSS] = useState('');
  const [fontFamily, setFontFamily] = useState('Arial');


  // Handler for font change
  const handleFontChange = (font) => {
    setFontFamily(font);
};

  const handleFontSizeChange = (size) => {
    setFontSize(size);
   
  };

  const handleFontColorChange = (color) => {
    setFontColor(color);
   
  };

  const handleFontWeightChange = (weight) => {
    setFontWeight(weight);
    
  };

  const handleStrokeColorChange = (color) => {
    setStrokeColor(color);

  };

  const generateCSS = () => {
    const shadows = [];
    const strokeSizeEm = strokeSize / fontSize;  // Convert stroke size to ems relative to font size
    
    // Correlate number of directions with stroke size
    const NUM_DIRECTIONS = Math.max(36, strokeSize * 10); // For example, for strokeSize of 1, we get 10 directions, for 10 we get 100.
    
    const angleIncrement = 2 * Math.PI / NUM_DIRECTIONS;  // Calculate the angle increment based on the number of directions

    for (let i = 0; i < NUM_DIRECTIONS; i++) {
        const x = Math.cos(i * angleIncrement) * strokeSizeEm;
        const y = Math.sin(i * angleIncrement) * strokeSizeEm;
        shadows.push(`${x}em ${y}em 0 ${strokeColor}`);
    }

    const css = `${shadows.join(', ')}`;
    setGeneratedCSS(css);
};


useEffect(() => {
  generateCSS();
}, [strokeColor, strokeSize]);


  const styles = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    color: fontColor,
    textShadow: generatedCSS
};


  return (
    <div className="App">
      <LivePreview styles={styles} />
      <FontFamilySelector onFontChange={handleFontChange} />
      <FontSizeSelector fontSize={fontSize} onFontSizeChange={handleFontSizeChange} />
      <FontWeightSelector fontWeight={fontWeight} onFontWeightChange={handleFontWeightChange} />
      <ColorPicker label="Font Color" color={fontColor} onColorChange={handleFontColorChange} />
      <ColorPicker label="Stroke Color" color={strokeColor} onColorChange={handleStrokeColorChange} />
      <div>
        <label>
          Stroke Size: 
        <input 
            type="range" 
            min="1" 
            max="20" 
            value={strokeSize} 
            onChange={e => setStrokeSize(e.target.value)} 
          />
        </label>
         {strokeSize} px
      </div>

      <div>
    <h3>Generated CSS:</h3>
    <code>
  text-shadow: {generatedCSS.replace(/(\d+)px/g, (match, p1) => `${p1/fontSize}em`)}
</code>

<button onClick={() => navigator.clipboard.writeText(`text-shadow: ${generatedCSS}`)}>Copy to Clipboard</button>

</div>

      {/* We'll add more components here as we create them */}
    </div>
  );
}

export default App;
