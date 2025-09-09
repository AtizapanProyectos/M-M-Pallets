// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initHeroAnimations();
    initProductFilter();
    initContactForm();
    initScrollAnimations();
    initFeaturedCardCarousel();
});

// Navbar functionality
function initNavbar() {
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Hero section animations
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-title, .cta-button');
    
    // Animate hero elements on load
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 1s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, (index + 1) * 200);
    });

    // CTA button hover effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Product filter functionality
function initProductFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter products with animation
            productCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Product card hover effects
    productCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.view-details');
        
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', () => {
                const productName = card.querySelector('h3').textContent;
                showProductModal(productName, card);
            });
        }
    });
}

// Featured card carousel
function initFeaturedCardCarousel() {
    const prevBtn = document.querySelector('.card-nav.prev');
    const nextBtn = document.querySelector('.card-nav.next');
    const cardContent = document.querySelector('.card-content');
    
    const products = [
        {
            title: 'TARIMAS DE ROBLE PREMIUM',
            location: 'MADERA EUROPEA',
            price: '$575',
            discount: '45% OFF'
        },
        {
            title: 'TARIMAS DE PINO NÓRDICO',
            location: 'MADERA ESCANDINAVA',
            price: '$295',
            discount: '30% OFF'
        },
        {
            title: 'TARIMAS DE CEREZO',
            location: 'MADERA AMERICANA',
            price: '$695',
            discount: '25% OFF'
        }
    ];
    
    let currentIndex = 0;
    
    function updateCard(index) {
        const product = products[index];
        if (cardContent) {
            cardContent.querySelector('h3').textContent = product.title;
            cardContent.querySelector('.card-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${product.location}`;
            cardContent.querySelector('.price').textContent = product.price;
            cardContent.querySelector('.discount-badge').textContent = product.discount;
        }
    }
    
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % products.length;
            updateCard(currentIndex);
            animateCardTransition();
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + products.length) % products.length;
            updateCard(currentIndex);
            animateCardTransition();
        });
    }
    
    function animateCardTransition() {
        const featuredCard = document.querySelector('.featured-card');
        if (featuredCard) {
            featuredCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                featuredCard.style.transform = 'scale(1)';
            }, 150);
        }
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '✓ Mensaje Enviado';
                submitBtn.style.background = '#28a745';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '#8B4513';
                    submitBtn.disabled = false;
                    contactForm.reset();
                    
                    showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
                }, 2000);
            }, 1500);
        });
        
        // Form validation
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearValidation);
        });
    }
}

// Input validation
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    if (!value) {
        showInputError(input, 'Este campo es obligatorio');
    } else if (input.type === 'email' && !isValidEmail(value)) {
        showInputError(input, 'Por favor, introduce un email válido');
    } else {
        clearInputError(input);
    }
}

function clearValidation(e) {
    clearInputError(e.target);
}

function showInputError(input, message) {
    clearInputError(input);
    
    input.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorDiv);
}

function clearInputError(input) {
    input.style.borderColor = '#e0e0e0';
    const errorDiv = input.parentNode.querySelector('.input-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for product cards
                if (entry.target.classList.contains('product-card')) {
                    const cards = entry.target.parentNode.querySelectorAll('.product-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Special animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    const cards = entry.target.parentNode.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-text, .about-image, .section-header, .product-card, .service-card, .contact-info, .contact-form');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        observer.observe(element);
    });
}

// Product modal
function showProductModal(productName, productCard) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${productCard.querySelector('img').src}" alt="${productName}">
                    </div>
                    <div class="modal-info">
                        <h2>${productName}</h2>
                        <p class="modal-description">Tarima de alta calidad con acabado profesional. Perfecta para espacios modernos y tradicionales.</p>
                        <div class="modal-specs">
                            <h3>Especificaciones:</h3>
                            <ul>
                                <li>Material: Madera natural seleccionada</li>
                                <li>Grosor: 22mm</li>
                                <li>Ancho: 190mm</li>
                                <li>Longitud: Variable</li>
                                <li>Instalación incluida</li>
                                <li>Garantía: 10 años</li>
                            </ul>
                        </div>
                        <div class="modal-price">
                            <span class="price">${productCard.querySelector('.price').textContent}</span>
                            <span class="unit">/m²</span>
                        </div>
                        <button class="modal-cta">Solicitar Presupuesto</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    // CTA button functionality
    const ctaBtn = modal.querySelector('.modal-cta');
    ctaBtn.addEventListener('click', () => {
        closeModal();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        showNotification('¡Perfecto! Completa el formulario y te enviaremos un presupuesto personalizado.', 'info');
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#8B4513'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// Add modal CSS styles to document
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .product-modal .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .product-modal .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: modalSlideIn 0.3s ease;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-50px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        .product-modal .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            color: #666;
            cursor: pointer;
            z-index: 1;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .product-modal .modal-close:hover {
            background: #f0f0f0;
            color: #333;
        }
        
        .product-modal .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
        }
        
        .product-modal .modal-image {
            position: relative;
            height: 400px;
        }
        
        .product-modal .modal-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px 0 0 20px;
        }
        
        .product-modal .modal-info {
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .product-modal .modal-info h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 15px;
        }
        
        .product-modal .modal-description {
            color: #666;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        
        .product-modal .modal-specs h3 {
            font-size: 1.2rem;
            font-weight: 600;
            color: #8B4513;
            margin-bottom: 15px;
        }
        
        .product-modal .modal-specs ul {
            list-style: none;
            padding: 0;
        }
        
        .product-modal .modal-specs li {
            color: #666;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }
        
        .product-modal .modal-specs li:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #8B4513;
            font-weight: bold;
        }
        
        .product-modal .modal-price {
            display: flex;
            align-items: baseline;
            gap: 5px;
            margin: 25px 0;
        }
        
        .product-modal .modal-price .price {
            font-size: 2rem;
            font-weight: 600;
            color: #8B4513;
        }
        
        .product-modal .modal-price .unit {
            font-size: 1.2rem;
            color: #666;
        }
        
        .product-modal .modal-cta {
            background: #8B4513;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            align-self: flex-start;
        }
        
        .product-modal .modal-cta:hover {
            background: #A0522D;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .product-modal .modal-body {
                grid-template-columns: 1fr;
            }
            
            .product-modal .modal-image img {
                border-radius: 20px 20px 0 0;
            }
            
            .product-modal .modal-info {
                padding: 30px 20px;
            }
        }
        
        /* Hamburger menu styles for mobile */
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 80px;
                right: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding: 50px 0;
                transition: right 0.3s ease;
                z-index: 999;
            }
            
            .nav-menu.active {
                right: 0;
            }
            
            .nav-menu li {
                margin: 20px 0;
            }
            
            .nav-menu a {
                font-size: 1.2rem;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        /* Loading animation */
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Smooth transitions for all interactive elements */
        .product-card,
        .service-card,
        .nav-menu a,
        .filter-tab,
        .cta-button,
        .submit-btn,
        .view-details,
        .info-btn,
        .card-nav {
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        /* Enhanced hover effects */
        .product-card:hover .product-image img {
            transform: scale(1.1);
        }
        
        .service-card:hover .service-icon {
            transform: scale(1.1) rotate(5deg);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #8B4513;
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #A0522D;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize additional features
function initAdditionalFeatures() {
    // Add modal styles
    addModalStyles();
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Add loading states to buttons
    addLoadingStates();
    
    // Initialize tooltip functionality
    initTooltips();
    
    // Add keyboard navigation
    addKeyboardNavigation();
}

// Add loading states to buttons
function addLoadingStates() {
    const buttons = document.querySelectorAll('.cta-button, .view-details, .info-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                const originalText = this.textContent;
                this.classList.add('loading');
                this.innerHTML = '<span class="loading"></span> Cargando...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                }, 1000);
            }
        });
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.9rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
    
    setTimeout(() => tooltip.style.opacity = '1', 10);
    
    e.target.tooltipElement = tooltip;
}

function hideTooltip(e) {
    if (e.target.tooltipElement) {
        e.target.tooltipElement.style.opacity = '0';
        setTimeout(() => {
            if (e.target.tooltipElement && document.body.contains(e.target.tooltipElement)) {
                document.body.removeChild(e.target.tooltipElement);
            }
        }, 300);
    }
}

// Add keyboard navigation
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Close modal with Escape key
        if (e.key === 'Escape') {
            const modal = document.querySelector('.product-modal');
            if (modal) {
                const closeBtn = modal.querySelector('.modal-close');
                if (closeBtn) closeBtn.click();
            }
        }
        
        // Navigate through filter tabs with arrow keys
        const activeFilterTab = document.querySelector('.filter-tab.active');
        if (activeFilterTab && document.activeElement === activeFilterTab) {
            const filterTabs = Array.from(document.querySelectorAll('.filter-tab'));
            const currentIndex = filterTabs.indexOf(activeFilterTab);
            
            if (e.key === 'ArrowRight' && currentIndex < filterTabs.length - 1) {
                filterTabs[currentIndex + 1].click();
                filterTabs[currentIndex + 1].focus();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                filterTabs[currentIndex - 1].click();
                filterTabs[currentIndex - 1].focus();
            }
        }
    });
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Update navbar background
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Initialize all additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAdditionalFeatures();
    optimizePerformance();
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('Service Worker registered'))
            .catch(() => console.log('Service Worker registration failed'));
    });
}