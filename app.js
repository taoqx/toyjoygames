/* ==========================================================================
   ToyJoy Games - Showcase Website Javascript logic
   Core Features: Screenshot carousels, dynamic scroll header, swipe support
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initCarousels();
    initEasterEgg();
});

/**
 * Changes header opacity and padding on page scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load in case page is refreshed while scrolled
    handleScroll();
}

/**
 * Initializes carousels for app screenshot displays
 */
function initCarousels() {
    const carousels = ['carousel-freeze', 'carousel-tinytaps', 'carousel-airtrans', 'carousel-coloring'];
    
    carousels.forEach(id => {
        const carousel = document.getElementById(id);
        if (!carousel) return;
        
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const nextButton = carousel.querySelector('.btn-next');
        const prevButton = carousel.querySelector('.btn-prev');
        const indicators = Array.from(carousel.querySelectorAll('.indicator'));
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        const updateCarousel = (index) => {
            // Keep index in range
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentIndex = index;
            
            // Move track
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((ind, i) => {
                if (i === currentIndex) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });
        };
        
        // Button Event Listeners
        nextButton.addEventListener('click', () => {
            updateCarousel(currentIndex + 1);
        });
        
        prevButton.addEventListener('click', () => {
            updateCarousel(currentIndex - 1);
        });
        
        // Indicator Dots Event Listeners
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                updateCarousel(index);
            });
        });
        
        // Touch Swipe Support for Mobile Device Screens
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const swipeThreshold = 50; // pixels
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swiped Left -> Next
                updateCarousel(currentIndex + 1);
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swiped Right -> Prev
                updateCarousel(currentIndex - 1);
            }
        };
    });
}

/**
 * Playful Easter egg when user clicks the logo game controller emoji
 */
function initEasterEgg() {
    const logoIcon = document.querySelector('.logo-icon');
    if (!logoIcon) return;
    
    logoIcon.addEventListener('click', () => {
        // Spin the controller emoji
        logoIcon.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        logoIcon.style.transform = 'rotate(360deg) scale(1.4)';
        
        // Reset rotation after animation completes
        setTimeout(() => {
            logoIcon.style.transition = 'none';
            logoIcon.style.transform = 'none';
            setTimeout(() => {
                logoIcon.style.transition = '';
            }, 50);
        }, 800);
        
        // Spawn small colorful floating emojis around the logo
        const logoArea = document.querySelector('.logo-area');
        const emojis = ['🌟', '✨', '🔥', '💖', '🕹️', '🎨'];
        
        for (let i = 0; i < 6; i++) {
            const span = document.createElement('span');
            span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            span.style.position = 'absolute';
            span.style.left = '20px';
            span.style.top = '10px';
            span.style.fontSize = '1.2rem';
            span.style.pointerEvents = 'none';
            span.style.zIndex = '999';
            span.style.transition = 'all 1s ease-out';
            
            logoArea.appendChild(span);
            
            // Random direction vectors
            const angle = (Math.random() * Math.PI * 2);
            const distance = 40 + Math.random() * 60;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            // Trigger animation frame
            requestAnimationFrame(() => {
                span.style.transform = `translate(${x}px, ${y}px) scale(0.2)`;
                span.style.opacity = '0';
            });
            
            // Clean up elements
            setTimeout(() => {
                span.remove();
            }, 1000);
        }
    });
}
