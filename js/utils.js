// js/utils.js

/**
 * Formats a number into a currency string.
 * @param {number} amount The number to format.
 * @param {string} currencyCode The ISO currency code.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount, currencyCode) => {
    const localeMap = {
        'ZAR': 'en-ZA', 'USD': 'en-US', 'EUR': 'de-DE', 'GBP': 'en-GB'
    };
    const locale = localeMap[currencyCode] || 'en-ZA';

    return new Intl.NumberFormat(locale, {
        style: 'currency', currency: currencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(amount);
};

/**
 * Calculates the future value of an investment.
 * @param {number} P - Principal (current savings).
 * @param {number} PMT - Monthly payment (contribution).
 * @param {number} r - Monthly interest rate.
 * @param {number} n - Number of months.
 * @returns {number} The future value.
 */
export const calculateFutureValue = (P, PMT, r, n) => {
    if (r === 0) return P + PMT * n;
    return P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
};