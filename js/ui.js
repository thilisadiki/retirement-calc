// js/ui.js
import { formatCurrency } from './utils.js';

// --- DOM Element Selections (Exported for use in main.js) ---
export const form = document.getElementById('retirement-form');
export const resultsContainer = document.getElementById('results-container');
export const projectedValueEl = document.getElementById('projected-value');
export const targetValueEl = document.getElementById('target-value');
export const summaryMessageEl = document.getElementById('summary-message');
export const rateOfReturnInput = document.getElementById('rate-of-return');
export const rateValueSpan = document.getElementById('rate-value');
const chartCanvas = document.getElementById('results-chart');

let resultsChart; // To hold the chart instance

/**
 * Updates the text content of the results and summary message.
 */
export const updateResultsText = (projected, target, currency) => {
    projectedValueEl.textContent = formatCurrency(projected, currency);
    targetValueEl.textContent = formatCurrency(target, currency);

    summaryMessageEl.classList.remove('success', 'shortfall');
    if (projected >= target) {
        const surplus = projected - target;
        summaryMessageEl.textContent = `Congratulations! You're on track to exceed your goal by ${formatCurrency(surplus, currency)}.`;
        summaryMessageEl.classList.add('success');
    } else {
        const shortfall = target - projected;
        summaryMessageEl.textContent = `You have a projected shortfall of ${formatCurrency(shortfall, currency)}. Consider increasing your contributions.`;
        summaryMessageEl.classList.add('shortfall');
    }
};

/**
 * Renders or updates the results chart.
 */
export const renderChart = (projected, target) => {
    if (resultsChart) resultsChart.destroy();
    
    resultsChart = new Chart(chartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Your Goal'],
            datasets: [{
                label: 'Target Needed', data: [target], backgroundColor: '#c8d0e0',
            }, {
                label: 'Your Projection', data: [projected], backgroundColor: '#5b69d4',
            }]
        },
        // Using CSS variables directly in JS requires a bit more work.
        // For simplicity, we hardcode the new theme colors here.
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#848b9f' } },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const currency = document.getElementById('currency').value;
                            return `${context.dataset.label}: ${formatCurrency(context.parsed.y, currency)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#848b9f', callback: (value) => formatCurrency(value, document.getElementById('currency').value) },
                    grid: { color: '#c8d0e0' }
                },
                x: { ticks: { color: '#848b9f' }, grid: { color: 'transparent' } }
            }
        }
    });
};