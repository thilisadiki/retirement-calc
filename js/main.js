// js/main.js
import { calculateFutureValue } from './utils.js';
import {
    form,
    resultsContainer,
    rateOfReturnInput,
    rateValueSpan,
    updateResultsText,
    renderChart
} from './ui.js';

/**
 * Gathers and validates inputs, then runs calculations and updates the UI.
 */
const runCalculationAndUpdateUI = () => {
    // 1. Get and parse inputs
    const currentAge = parseInt(document.getElementById('current-age').value);
    const retirementAge = parseInt(document.getElementById('retirement-age').value);
    const currentSavings = parseFloat(document.getElementById('current-savings').value);
    const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value);
    const annualRate = parseFloat(rateOfReturnInput.value);
    const desiredIncome = parseFloat(document.getElementById('desired-income').value);
    const currency = document.getElementById('currency').value;

    // 2. Validate inputs
    if (isNaN(currentAge) || isNaN(retirementAge) || retirementAge <= currentAge) {
        if (event.type === 'submit') {
            alert("Please provide valid ages.");
        }
        return;
    }

    // 3. Perform calculations
    const yearsToRetirement = retirementAge - currentAge;
    const n = yearsToRetirement * 12;
    const r = (annualRate / 100) / 12;
    const projectedNestEgg = calculateFutureValue(currentSavings, monthlyContribution, r, n);
    const targetNestEgg = desiredIncome / 0.04;

    // 4. Update UI
    updateResultsText(projectedNestEgg, targetNestEgg, currency);
    renderChart(projectedNestEgg, targetNestEgg);
    resultsContainer.hidden = false;
};

// --- Main Event Listeners ---

// This is the NEW listener with auto-scroll
form.addEventListener('submit', (event) => {
    event.preventDefault();
    runCalculationAndUpdateUI();

    // After the calculation, smoothly scroll to the results
    // We add a small delay to ensure the container is rendered before we scroll
    setTimeout(() => {
        if (!resultsContainer.hidden) {
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100); 
});

// Handle live changes from the range slider
rateOfReturnInput.addEventListener('input', () => {
    rateValueSpan.textContent = `${rateOfReturnInput.value}%`;

    if (!resultsContainer.hidden) {
        runCalculationAndUpdateUI();
    }
});