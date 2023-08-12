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
    // We'll integrate stroke logic here later
  };

  const generateCSS = () => {
    const shadows = [];
    const strokeSizeInt = parseInt(strokeSize, 10);  
    
    for (let angle = 0; angle < 2 * Math.PI; angle += 1 / strokeSizeInt) {
        const x = Math.cos(angle) * strokeSizeInt;
        const y = Math.sin(angle) * strokeSizeInt;
        shadows.push(`${x}px ${y}px 0 ${strokeColor}`);
    }

    const css = `${shadows.join(', ')}`;  // Removed "text-shadow:" prefix
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
  
  console.log(styles);
  

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
            max="10" 
            value={strokeSize} 
            onChange={e => setStrokeSize(e.target.value)} 
          />
        </label>
         {strokeSize} px
      </div>

      <div>
        <h3>Generated CSS:</h3>
        <code>{generatedCSS}</code>
        <button onClick={() => navigator.clipboard.writeText(generatedCSS)}>Copy to Clipboard</button>
      </div>
      



      {/* We'll add more components here as we create them */}
    </div>
  );
}

export default App;
