// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('nav-mobile-menu-btn');
    const mobileMenuIcon = document.getElementById('nav-mobile-menu-icon');
    const mobileDropdown = document.getElementById('nav-mobile-dropdown');

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
                    const totalBtcHeld = 12.62;
                    const reserveValue = price * totalBtcHeld;
                    const reserveFormatted = '$' + Math.round(reserveValue).toLocaleString('en-US');
                    const reserveValueElem = document.getElementById('current-investment-value');
                    if (reserveValueElem) {
                        reserveValueElem.textContent = reserveFormatted;
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