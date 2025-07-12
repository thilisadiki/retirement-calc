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
    const currency = document.getElementById('currency').value;

    // --- LOGIC CHANGE HERE ---
    // Get the retirement goal directly from the user's input
    const targetNestEgg = parseFloat(document.getElementById('target-goal').value); 
    // The old calculation (desiredIncome / 0.04) is now removed.

    // 2. Validate inputs
    if (isNaN(currentAge) || isNaN(retirementAge) || isNaN(targetNestEgg) || retirementAge <= currentAge) {
        if (event.type === 'submit') {
            alert("Please provide valid ages and a valid retirement goal.");
        }
        return;
    }

    // 3. Perform projection calculation
    const yearsToRetirement = retirementAge - currentAge;
    const n = yearsToRetirement * 12;
    const r = (annualRate / 100) / 12;
    const projectedNestEgg = calculateFutureValue(currentSavings, monthlyContribution, r, n);

    // 4. Update UI with the projection and the user-defined target
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