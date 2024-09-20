function updateText() {
	const text = document.getElementById('text').value;
	const fontSize = document.getElementById('fontSize').value;
	const fontWeight = document.getElementById('fontWeight').value;
	const fontFamily = document.getElementById('fontFamily').value;
	const strokeType = document.getElementById('strokeType').value;
	const strokeWidth1 = parseFloat(document.getElementById('strokeWidth1').value);
	const strokeWidth2 = parseFloat(document.getElementById('strokeWidth2').value);
	const textColor = document.getElementById('textColor').value;
	const strokeColor1 = document.getElementById('strokeColor1').value;
	const strokeColor2 = document.getElementById('strokeColor2').value;
	const backgroundColor = document.getElementById('backgroundColor').value;

	const output = document.getElementById('output');
	output.style.fontSize = `${fontSize}px`;
	output.style.fontWeight = fontWeight;
	output.style.fontFamily = fontFamily;
	output.style.color = textColor;
	output.style.backgroundColor = backgroundColor;
	output.textContent = text;

	let textShadow = '';
	if (strokeType === 'single') {
		textShadow = getOptimizedStroke(strokeWidth1, strokeColor1);
	} else {
		textShadow = getOptimizedDoubleStroke(strokeWidth1, strokeColor1, strokeWidth2, strokeColor2);
	}

	output.style.textShadow = textShadow;
	updateCSSOutput(textShadow);
}

function getOptimizedStroke(width, color) {
	const baseSteps = 16;
	const steps = Math.max(baseSteps, Math.floor(baseSteps * width * 20)); // Increase steps for larger widths
	let shadow = '';
	for (let i = 0; i < steps; i++) {
		const angle = (i / steps) * 2 * Math.PI;
		const x = Math.sin(angle) * width;
		const y = Math.cos(angle) * width;
		shadow += `${x.toFixed(3)}em ${y.toFixed(3)}em 0 ${color}`;
		if (i < steps - 1) shadow += ',';
	}
	return shadow;
}

function getOptimizedDoubleStroke(width1, color1, width2, color2) {
	const outerStroke = getOptimizedStroke(width2, color2);
	const innerStroke = getOptimizedStroke(width1, color1);
	return outerStroke + ',' + innerStroke;
}

function updateCSSOutput(textShadow) {
	const cssOutput = document.getElementById('cssOutput');
	cssOutput.textContent = `text-shadow:${textShadow};`;
}

function copyCSS() {
	const cssOutput = document.getElementById('cssOutput');
	navigator.clipboard.writeText(cssOutput.textContent).then(() => {
		alert('CSS copied to clipboard!');
	});
}

function swapStrokeColors() {
	const strokeColor1 = document.getElementById('strokeColor1');
	const strokeColor2 = document.getElementById('strokeColor2');
	const tempColor = strokeColor1.value;
	strokeColor1.value = strokeColor2.value;
	strokeColor2.value = tempColor;
	updateText();
}

// Pre-loaded fonts
const fontFamilies = ['Arial, sans-serif', 'Helvetica, sans-serif', 'Times New Roman, serif', 'Courier New, monospace', 'Georgia, serif', 'Palatino, serif', 'Garamond, serif', 'Bookman, serif', 'Comic Sans MS, cursive', 'Trebuchet MS, sans-serif'];

const fontSelect = document.getElementById('fontFamily');
fontFamilies.forEach((font) => {
	const option = document.createElement('option');
	option.value = font;
	option.textContent = font.split(',')[0];
	fontSelect.appendChild(option);
});

// Set default font and update text
fontSelect.value = 'Arial, sans-serif';
updateText();

// Add event listeners to all input fields
const inputs = document.querySelectorAll('input, select');
inputs.forEach((input) => {
	input.addEventListener('input', updateText);
});

// Allow pasting hex codes into color inputs
const colorInputs = document.querySelectorAll('input[type="color"]');
colorInputs.forEach((input) => {
	input.addEventListener('paste', (e) => {
		e.preventDefault();
		const pastedText = (e.clipboardData || window.clipboardData).getData('text');
		if (/^#?[0-9A-F]{6}$/i.test(pastedText)) {
			input.value = pastedText.startsWith('#') ? pastedText : '#' + pastedText;
			updateText();
		}
	});
});

// Initial update
updateText();
