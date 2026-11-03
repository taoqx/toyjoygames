/**
 * ToyJoy Games Blog Category Filtering Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    initCategoryFilters();
    initHeaderScroll();
});

/**
 * Handles category filtering animation
 */
function initCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (!filterButtons.length || !blogCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter cards with animations
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Reset classes
                card.classList.remove('fade-in');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hide');
                    // Force a reflow to restart keyframe animation
                    void card.offsetWidth;
                    card.classList.add('fade-in');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

/**
 * Changes header opacity and padding on page scroll (replicated from main app.js for subpages)
 */
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}
