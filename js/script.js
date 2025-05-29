document.addEventListener('DOMContentLoaded', function () {
    // DOM Element References
    const temperatureInput = document.getElementById('temperature-input');
    const convertButton = document.getElementById('convert-button');
    const resetButton = document.getElementById('reset-button');
    const reverseButton = document.getElementById('reverse-button');
    const temperatureOutput = document.getElementById('temperature-output');
    const calculationExplanation = document.getElementById('calculation-explanation');
    const errorMessage = document.getElementById('error-message');

    const instructionText = document.getElementById('instruction-text');
    const inputLabel = document.getElementById('input-label');
    const outputLabel = document.getElementById('output-label');

    const formulaTitle = document.getElementById('formula-title');
    const formulaExplanationRunningText = document.getElementById('formula-explanation-running-text');
    const formulaExplanationStaticText = document.getElementById('formula-explanation-static-text');

    // State variable: true for Celsius to Fahrenheit, false for Fahrenheit to Celsius
    let isCelsiusToFahrenheit = true;

    // Function to update labels, placeholder text, and formula explanations
    function updateInterface() {
        if (isCelsiusToFahrenheit) {
            // Celsius to Fahrenheit (Initial State)
            instructionText.textContent = 'Masukkan suhu derajat Celsius (°C) ke kotak di bawah, lalu klik tombol "Konversi" untuk mendapatkan hasil konversi dalam bentuk Fahrenheit (°F).';
            inputLabel.textContent = 'Celsius (°C):';
            outputLabel.textContent = 'Fahrenheit (°F):';
            temperatureInput.placeholder = 'Contoh: 30';
            
            formulaTitle.textContent = 'Cara Konversi Dari Celsius (°C) ke Fahrenheit (°F)';
            // User's requested running text for initial C to F state:
            formulaExplanationRunningText.innerHTML = 'Suhu S<sub>(°C)</sub> dalam derajat Celcius (°C) sama dengan suhu S<sub>(°F)</sub> dalam derajat Fahrenheit (°F) dikurangi 32 dikali 9/5.';
            
            // Static formula details: Display C to F formula when C to F mode is active
            formulaExplanationStaticText.innerHTML = `
                <br>
                <strong>S<sub>(°F)</sub> = (S<sub>(°C)</sub> × 9/5) + 32</strong>
                <br>
                atau
                <br>
                <strong>S<sub>(°F)</sub> = (S<sub>(°C)</sub> × 1.8) + 32</strong>`;
        } else {
            // Fahrenheit to Celsius (After Reverse)
            instructionText.textContent = 'Masukkan suhu derajat Fahrenheit (°F) ke kotak di bawah, lalu klik tombol "Konversi" untuk mendapatkan hasil konversi dalam bentuk Celsius (°C).';
            inputLabel.textContent = 'Fahrenheit (°F):';
            outputLabel.textContent = 'Celsius (°C):';
            temperatureInput.placeholder = 'Contoh: 86';

            formulaTitle.textContent = 'Cara Konversi Dari Fahrenheit (°F) ke Celsius (°C)';
            // The other running text for F to C state:
            formulaExplanationRunningText.innerHTML = 'Suhu S<sub>(°F)</sub> dalam derajat Fahrenheit (°F) sama dengan suhu S<sub>(°C)</sub> dalam derajat Celsius (°C) kali 9/5 tambah 32.';
            
            // Static formula details: Display F to C formula when F to C mode is active
            formulaExplanationStaticText.innerHTML = `
                <br>
                <strong>S<sub>(°C)</sub> = (S<sub>(°F)</sub> - 32) × 5/9</strong>
                <br>
                atau
                <br>
                <strong>S<sub>(°C)</sub> = (S<sub>(°F)</sub> - 32) × 0.5555...</strong>`;
        }
        // Clear previous results and errors on interface update
        clearFields();
    }

    // Function to handle the conversion
    function handleConvert() {
        const tempValue = temperatureInput.value.trim();
        errorMessage.textContent = ''; // Clear previous error messages

        if (tempValue === '' || isNaN(parseFloat(tempValue))) {
            errorMessage.textContent = 'Harap masukkan angka yang valid.';
            temperatureOutput.textContent = '';
            calculationExplanation.textContent = '';
            temperatureInput.focus();
            return;
        }

        const inputTemp = parseFloat(tempValue);
        let convertedTemp;
        let calculation;

        if (isCelsiusToFahrenheit) {
            // Celsius to Fahrenheit: (C * 9/5) + 32
            convertedTemp = (inputTemp * 9/5) + 32;
            calculation = `${inputTemp}°C × (9/5) + 32 = ${convertedTemp.toFixed(2)}°F`;
        } else {
            // Fahrenheit to Celsius: (F - 32) * 5/9
            convertedTemp = (inputTemp - 32) * 5/9;
            calculation = `(${inputTemp}°F - 32) × 5/9 = ${convertedTemp.toFixed(2)}°C`;
        }

        temperatureOutput.textContent = convertedTemp.toFixed(2);
        calculationExplanation.textContent = calculation;
    }

    // Function to clear all input and output fields
    function clearFields() {
        temperatureInput.value = '';
        temperatureOutput.textContent = '';
        calculationExplanation.textContent = '';
        errorMessage.textContent = '';
    }

    // Function to handle the reverse conversion
    function handleReverse() {
        isCelsiusToFahrenheit = !isCelsiusToFahrenheit;
        updateInterface();
    }

    // Event Listeners
    convertButton.addEventListener('click', handleConvert);
    resetButton.addEventListener('click', () => {
        clearFields();
    });
    reverseButton.addEventListener('click', handleReverse);

    temperatureInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleConvert();
        }
    });

    // Initial setup of the interface
    updateInterface();
});