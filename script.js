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