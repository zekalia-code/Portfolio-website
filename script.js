// Variable Declarations 
const mainElements = document.querySelectorAll('main');
const desktopLinks = document.querySelectorAll('#desktop-nav a');
const mobileLinks = document.querySelectorAll('#mobile-nav a');
const hamburgerIcon = document.getElementById('hamburger-menu');
const mobileNav = document.getElementById('mobile-nav');
// Variables for Project Carousel
const videoCarousel = document.getElementById('video-carousel'); 
const scrollLeftBtn = document.getElementById('scroll-left-btn'); 
const scrollRightBtn = document.getElementById('scroll-right-btn');
const nav = document.getElementById('desktop-nav');
let lastScrollTop = 0;

/**
 * Handles the form submission process.
 */
function submitAndClear(e) {
    setTimeout(function() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
        }
    }, 100); 
}

/**
 * Switches the active content section.
 */
function showPage(sectionId) {
    // Hide all main sections
    mainElements.forEach(main => {
        main.classList.add('hidden');
        main.classList.remove('flex'); 
    });

    // Show requested section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        activeSection.classList.add('flex'); 
        activeSection.scrollTop = 0; 
        document.body.style.overflowY = 'hidden'; 
    }

    // Update nav links (desktop)
    desktopLinks.forEach(link => {
        link.classList.remove('active-underline', 'text-blue-500');
        link.classList.add('underline-on-hover', 'text-blue-300', 'hover:text-blue-500');
    });
    const activeLink = document.getElementById(sectionId.replace('-section', '-link'));
    if (activeLink) {
        activeLink.classList.remove('underline-on-hover', 'text-blue-300', 'hover:text-blue-500');
        activeLink.classList.add('active-underline', 'text-blue-500');
    }

    // Update nav links (mobile)
    mobileLinks.forEach(link => {
        link.classList.remove('text-blue-500', 'font-bold');
        link.classList.add('text-blue-300', 'font-medium');
    });
    const activeMobileLink = document.querySelector(`#mobile-nav a[onclick*="${sectionId}"]`);
    if (activeMobileLink) {
        activeMobileLink.classList.remove('text-blue-300', 'font-medium');
        activeMobileLink.classList.add('text-blue-500', 'font-bold');
    }
}

/**
 * Toggles the mobile navigation menu.
 */
function toggleMobileMenu() {
    hamburgerIcon.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflowY = mobileNav.classList.contains('open') ? 'hidden' : 'hidden'; 
}

/**
 * Enables scroll-to-hide functionality for the desktop navigation bar.
 */
function setupNavHideOnScroll() {
    const mainContent = document.querySelector('main:not(.hidden)');
    if (mainContent && nav) {
        mainContent.onscroll = () => {
            let st = mainContent.scrollTop;

            if (st > lastScrollTop && st > 50) {
                nav.classList.add('nav-hidden');
            } else if (st < lastScrollTop) {
                nav.classList.remove('nav-hidden');
            }
            lastScrollTop = st <= 0 ? 0 : st;
        };
    }
}

/**
 * Sets up the functionality for the Project Video Carousel scroll buttons.
 */
function setupVideoCarousel() {
    const scrollAmount = 350; 

    if (scrollLeftBtn && videoCarousel) {
        scrollLeftBtn.addEventListener('click', () => {
            videoCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    if (scrollRightBtn && videoCarousel) {
        scrollRightBtn.addEventListener('click', () => {
            videoCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
}

/**
 * Sets up tap-to-play/pause for videos on mobile & desktop
 */
function setupVideoPlayToggle() {
    const videos = document.querySelectorAll(".custom-video");
    videos.forEach(video => {
        video.addEventListener("click", (e) => {
            // If user clicked the actual video element (not a control button)
            if (e.target === video) {
                if (video.paused) {
                    videos.forEach(v => { if (!v.paused && v !== video) v.pause(); });
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    showPage('home-section'); 
    
    // Set up event listeners for scroll-to-hide and carousel
    desktopLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(setupNavHideOnScroll, 100);
        });
    });
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(setupNavHideOnScroll, 100); 
        });
    });

    setupNavHideOnScroll();
    setupVideoCarousel();
    setupVideoPlayToggle(); // ✅ Enable click-to-play/pause anywhere on the video
});
