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

	const output = document.getElementById('output');
	output.style.fontSize = `${fontSize}px`;
	output.style.fontWeight = fontWeight;
	output.style.fontFamily = fontFamily;
	output.style.color = textColor;
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

function getOptimizedStroke(width, color, steps = 16) {
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
	const outerStroke = getOptimizedStroke(width2, color2, 32);
	const innerStroke = getOptimizedStroke(width1, color1, 32);
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

// Fetch Google Fonts
fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc')
	.then((response) => response.json())
	.then((data) => {
		const fontSelect = document.getElementById('fontFamily');
		data.items.forEach((font) => {
			const option = document.createElement('option');
			option.value = `'${font.family}', ${font.category}`;
			option.textContent = font.family;
			fontSelect.appendChild(option);
		});
		// Set default font and update text
		fontSelect.value = "'Roboto', sans-serif";
		updateText();
	})
	.catch((error) => console.error('Error fetching Google Fonts:', error));

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
