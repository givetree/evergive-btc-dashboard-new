// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('nav-mobile-menu-btn');
    const mobileMenuIcon = document.getElementById('nav-mobile-menu-icon');
    const mobileDropdown = document.getElementById('nav-mobile-dropdown');

    function getTotalsFromTable() {
        let totalDonated = 0;
        let totalBtcHeld = 0;
        const table = document.getElementById('transactions-table');
        if (table) {
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const btcCell = row.cells[2];
                const usdCell = row.cells[3];
                if (btcCell && usdCell) {
                    const btc = parseFloat(btcCell.textContent.replace(/[^\d.\-]/g, ''));
                    const usd = parseFloat(usdCell.textContent.replace(/[^\d.\-]/g, ''));
                    if (!isNaN(btc)) totalBtcHeld += btc;
                    if (!isNaN(usd)) totalDonated += usd;
                }
            });
        }
        return { totalDonated, totalBtcHeld };
    }

    if (mobileMenuBtn && mobileDropdown) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileDropdown.classList.toggle('active');
            mobileMenuIcon.textContent = mobileDropdown.classList.contains('active') ? '−' : '+';
        });

        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 900) {
                if (!mobileMenuBtn.contains(event.target) && !mobileDropdown.contains(event.target)) {
                    mobileDropdown.classList.remove('active');
                    mobileMenuIcon.textContent = '+';
                }
            }
        });
    }

    function updateBtcPriceAndReserve() {
        const { totalDonated, totalBtcHeld } = getTotalsFromTable();
        // Update Total Donated
        const totalDonatedElem = document.getElementById('total-invested');
        if (totalDonatedElem) {
            totalDonatedElem.textContent = '$' + Math.round(totalDonated).toLocaleString('en-US');
        }
        // Update Total BTC Held
        const totalBtcElem = document.getElementById('total-btc-held');
        if (totalBtcElem) {
            totalBtcElem.textContent = totalBtcHeld.toFixed(2) + '\u20BF';
        }
        fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot')
            .then(response => response.json())
            .then(data => {
                const price = data.data && data.data.amount ? parseFloat(data.data.amount) : null;
                if (price) {
                    // Format price with commas
                    const formatted = '$' + price.toLocaleString('en-US', { maximumFractionDigits: 0 });
                    // Update all elements with class 'btc-current-price'
                    document.querySelectorAll('.btc-current-price').forEach(el => {
                        el.textContent = formatted;
                    });
                    // Also update the inline text in btc-price-info for fallback
                    const btcPriceInfo = document.getElementById('btc-price-info');
                    if (btcPriceInfo) {
                        btcPriceInfo.innerHTML = btcPriceInfo.innerHTML.replace(/Current: \$[\d,]+/, 'Current: ' + formatted);
                    }
                    // Update CURRENT CHARITY RESERVE VALUE
                    const reserveValue = price * totalBtcHeld;
                    const reserveFormatted = '$' + Math.round(reserveValue).toLocaleString('en-US');
                    const reserveValueElem = document.getElementById('current-investment-value');
                    if (reserveValueElem) {
                        reserveValueElem.textContent = reserveFormatted;
                    }
                    // Update PERFORMANCE
                    const perfValue = reserveValue - totalDonated;
                    const perfPercent = (perfValue / totalDonated) * 100;
                    const perfPercentElem = document.getElementById('performance-percent');
                    const perfChangeElem = document.getElementById('performance-change');
                    if (perfPercentElem) {
                        const sign = perfPercent >= 0 ? '+' : '';
                        perfPercentElem.textContent = sign + perfPercent.toFixed(2) + '%';
                    }
                    if (perfChangeElem) {
                        const sign = perfValue >= 0 ? '+' : '';
                        perfChangeElem.textContent = `(${sign}$${Math.round(Math.abs(perfValue)).toLocaleString('en-US')})`;
                    }
                }
            })
            .catch(err => console.error('Failed to fetch BTC price:', err));
    }

    // Initial fetch
    updateBtcPriceAndReserve();
    // Update every 5 seconds
    setInterval(updateBtcPriceAndReserve, 5000);
});

// Placeholder for future dynamic content updates
function updateMetrics(data) {
    // This function will be implemented to update the dashboard metrics
    // with real-time data from an API
    console.log('Metrics update function ready for implementation');
}

// Example of how to format currency values
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Example of how to format percentage values
function formatPercentage(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value / 100);
} 