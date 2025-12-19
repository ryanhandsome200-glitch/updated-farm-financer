// Loan Calculator Functionality
document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('calculator-form');
    const resetButton = document.getElementById('reset-calculator');
    const resultsDiv = document.getElementById('calculator-results');
    const placeholderDiv = document.getElementById('calculator-placeholder');

    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateLoan();
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', function() {
            resetCalculator();
        });
    }

    // Auto-calculate on input change
    const inputs = document.querySelectorAll('#calculator-form input, #calculator-form select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value && this.checkValidity()) {
                // Only calculate if all required fields have values
                const loanAmount = document.getElementById('loan-amount-calc').value;
                const interestRate = document.getElementById('interest-rate').value;
                const loanTerm = document.getElementById('loan-term').value;
                
                if (loanAmount && interestRate && loanTerm) {
                    calculateLoan();
                }
            }
        });
    });

    function calculateLoan() {
        // Get form values
        const loanAmount = parseFloat(document.getElementById('loan-amount-calc').value) || 0;
        const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
        const loanTerm = parseInt(document.getElementById('loan-term').value) || 0;
        const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;

        // Validate inputs
        if (!loanAmount || !interestRate || !loanTerm) {
            alert('Please fill in all required fields.');
            return;
        }

        if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
            alert('Please enter valid positive numbers.');
            return;
        }

        // Calculate loan
        const principal = loanAmount - downPayment;
        const monthlyRate = (interestRate / 100) / 12;
        const numPayments = loanTerm * 12;

        // Calculate monthly payment using the standard loan formula
        // M = P * [r(1+r)^n] / [(1+r)^n - 1]
        let monthlyPayment = 0;
        
        if (monthlyRate > 0) {
            const numerator = monthlyRate * Math.pow(1 + monthlyRate, numPayments);
            const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;
            monthlyPayment = principal * (numerator / denominator);
        } else {
            // If interest rate is 0, just divide principal by number of payments
            monthlyPayment = principal / numPayments;
        }

        // Calculate totals
        const totalPayment = monthlyPayment * numPayments;
        const totalInterest = totalPayment - principal;

        // Format numbers
        function formatCurrency(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount);
        }

        function formatNumber(num) {
            return new Intl.NumberFormat('en-US').format(num);
        }

        // Update results display
        document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment);
        document.getElementById('total-loan').textContent = formatCurrency(principal);
        document.getElementById('total-interest').textContent = formatCurrency(totalInterest);
        document.getElementById('total-payment').textContent = formatCurrency(totalPayment);
        document.getElementById('num-payments').textContent = formatNumber(numPayments);
        document.getElementById('down-payment-display').textContent = formatCurrency(downPayment);

        // Show results, hide placeholder
        if (resultsDiv) {
            resultsDiv.style.display = 'block';
        }
        if (placeholderDiv) {
            placeholderDiv.style.display = 'none';
        }

        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function resetCalculator() {
        calculatorForm.reset();
        if (resultsDiv) {
            resultsDiv.style.display = 'none';
        }
        if (placeholderDiv) {
            placeholderDiv.style.display = 'block';
        }
    }
});


