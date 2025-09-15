// Optimized JavaScript for M&M PALLETS website
// Single initialization with better performance and maintained animations

class MMPalletsApp {
    constructor() {
        this.isInitialized = false;
        this.observers = new Map();
        this.currentCarouselIndex = 0;
        this.carouselProducts = [
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
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupHeroAnimations();
        this.setupContactForm();
        this.setupCarousel();
        this.setupProductInteractions();
        this.setupPerformanceOptimizations();
        this.addCustomStyles();
        this.isInitialized = true;
    }

    // Navigation with optimized scroll handling
    setupNavigation() {
        const header = document.querySelector('header nav');
        if (!header) return;

        /* Throttled scroll handler for better performance
        let scrollTicking = false;
        const handleScroll = () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'transparent';
                header.style.boxShadow = 'none';
                header.style.backdropFilter = 'none';
            }
            scrollTicking = false;
        };
        */
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(handleScroll);
                scrollTicking = true;
            }
        }, { passive: true });

        // Smooth scroll for navigation links
        this.setupSmoothScroll();
    }

    setupSmoothScroll() {
        const links = document.querySelectorAll('nav a[href^="#"], .btn[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Optimized scroll animations with Intersection Observer
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Special staggered animation for product grid
                    if (entry.target.classList.contains('catalogo-grid')) {
                        this.animateProductCards(entry.target);
                    }
                    
                    // Special animation for stats
                    if (entry.target.classList.contains('catalogo-stats')) {
                        this.animateStats(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.producto, .stat-item, .contacto-info, .contacto-form, .catalogo-grid, .catalogo-stats'
        );
        
        animateElements.forEach(element => {
            element.classList.add('hidden');
            observer.observe(element);
        });

        this.observers.set('scroll', observer);
    }

    animateProductCards(grid) {
        const cards = grid.querySelectorAll('.producto');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }

    animateStats(statsContainer) {
        const stats = statsContainer.querySelectorAll('.stat-item');
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.classList.add('visible');
                this.animateNumber(stat.querySelector('.stat-number'));
            }, index * 150);
        });
    }

    animateNumber(element) {
        const finalNumber = element.textContent;
        const isPercentage = finalNumber.includes('%');
        const hasPlus = finalNumber.includes('+');
        const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (hasPlus && current >= numericValue) displayValue += '+';
            if (isPercentage) displayValue += '%';
            if (finalNumber.includes(',')) {
                displayValue = displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            
            element.textContent = displayValue;
        }, 40);
    }

    // Hero animations with improved timing
    setupHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero h2, .hero h1, .hero .btn');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, (index + 1) * 300);
        });

        // Hero bubble animation
        const heroBubble = document.querySelector('.hero-bubble');
        if (heroBubble) {
            heroBubble.style.opacity = '0';
            heroBubble.style.transform = 'translateY(50px)';
            setTimeout(() => {
                heroBubble.style.transition = 'all 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                heroBubble.style.opacity = '1';
                heroBubble.style.transform = 'translateY(0)';
            }, 1000);
        }
    }

    // Optimized contact form with better validation
    setupContactForm() {
        const form = document.querySelector('.contacto-form form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
            input.addEventListener('input', () => this.clearValidationError(input));
        });
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Validate all fields
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Submission animation
        submitBtn.innerHTML = '<div class="loading-spinner"></div> Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '✓ Mensaje Enviado';
            submitBtn.style.background = '#28a745';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
                
                this.showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
            }, 2000);
        }, 1500);
    }

    validateInput(input) {
        const value = input.value.trim();
        this.clearValidationError(input);
        
        if (!value) {
            this.showValidationError(input, 'Este campo es obligatorio');
            return false;
        }
        
        if (input.type === 'email' && !this.isValidEmail(value)) {
            this.showValidationError(input, 'Por favor, introduce un email válido');
            return false;
        }
        
        if (input.type === 'tel' && value.length < 10) {
            this.showValidationError(input, 'Introduce un teléfono válido');
            return false;
        }
        
        return true;
    }

    showValidationError(input, message) {
        input.style.borderColor = '#dc3545';
        input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'input-error';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    clearValidationError(input) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
        
        const errorDiv = input.parentNode.querySelector('.input-error');
        if (errorDiv) errorDiv.remove();
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Carousel functionality
    setupCarousel() {
        const prevBtn = document.querySelector('.card-nav.prev');
        const nextBtn = document.querySelector('.card-nav.next');
        
        if (!prevBtn || !nextBtn) return;

        nextBtn.addEventListener('click', () => this.nextCarouselItem());
        prevBtn.addEventListener('click', () => this.prevCarouselItem());
        
        // Auto-rotate carousel
        setInterval(() => this.nextCarouselItem(), 5000);
    }

    nextCarouselItem() {
        this.currentCarouselIndex = (this.currentCarouselIndex + 1) % this.carouselProducts.length;
        this.updateCarousel();
    }

    prevCarouselItem() {
        this.currentCarouselIndex = (this.currentCarouselIndex - 1 + this.carouselProducts.length) % this.carouselProducts.length;
        this.updateCarousel();
    }

    updateCarousel() {
        const cardContent = document.querySelector('.card-content');
        if (!cardContent) return;

        const product = this.carouselProducts[this.currentCarouselIndex];
        
        // Animate transition
        cardContent.style.opacity = '0';
        cardContent.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            const title = cardContent.querySelector('h3');
            const location = cardContent.querySelector('.card-location');
            const price = cardContent.querySelector('.price');
            const discount = cardContent.querySelector('.discount-badge');
            
            if (title) title.textContent = product.title;
            if (location) location.innerHTML = `📍 ${product.location}`;
            if (price) price.textContent = product.price;
            if (discount) discount.textContent = product.discount;
            
            cardContent.style.opacity = '1';
            cardContent.style.transform = 'translateX(0)';
        }, 200);
    }

    // Product interactions
    setupProductInteractions() {
        const productCards = document.querySelectorAll('.producto');
        
        productCards.forEach(card => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
            
            // Quote button functionality
            const quoteBtn = card.querySelector('.producto-btn');
            if (quoteBtn) {
                quoteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleQuoteRequest(card);
                });
            }
        });
    }

    handleQuoteRequest(productCard) {
        const productName = productCard.querySelector('h3').textContent;
        
        // Smooth scroll to contact form
        const contactForm = document.querySelector('#contacto');
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill product type
            setTimeout(() => {
                const productSelect = document.querySelector('#producto');
                if (productSelect) {
                    // Map product names to select options
                    const productMapping = {
                        'Tarima Estándar Nueva': 'estandar',
                        'Tarima Estándar Blanca': 'estandar',
                        'Tarima Estándar de Segunda': 'estandar',
                        'Tarima de Tacón Grande': 'reforzado',
                        'Tarima Europallet': 'premium'
                    };
                    
                    const mappedValue = productMapping[productName] || 'personalizado';
                    productSelect.value = mappedValue;
                    
                    // Add visual feedback
                    productSelect.style.background = '#e8f5e8';
                    setTimeout(() => {
                        productSelect.style.background = '';
                    }, 2000);
                }
                
                this.showNotification(`Perfecto! Completa el formulario para cotizar: ${productName}`, 'info');
            }, 1000);
        }
    }

    // Performance optimizations
    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Debounce resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.handleResize(), 250);
        }, { passive: true });
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
        
        this.observers.set('images', imageObserver);
    }

    handleResize() {
        // Handle responsive adjustments if needed
        const heroBubble = document.querySelector('.hero-bubble');
        if (heroBubble && window.innerWidth <= 768) {
            heroBubble.style.flexDirection = 'column';
        } else if (heroBubble) {
            heroBubble.style.flexDirection = 'row';
        }
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Auto remove
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Add necessary CSS styles
    addCustomStyles() {
        if (document.querySelector('#mm-custom-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'mm-custom-styles';
        style.textContent = `
            .hidden { 
                opacity: 0; 
                transform: translateY(40px); 
                transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1); 
            }
            .visible { 
                opacity: 1; 
                transform: translateY(0); 
            }
            
            .loading-spinner {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .input-error {
                color: #dc3545;
                font-size: 0.8rem;
                margin-top: 5px;
                animation: fadeInError 0.3s ease;
            }
            
            @keyframes fadeInError {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 10px;
                color: white;
                z-index: 10000;
                max-width: 300px;
                transform: translateX(100%);
                transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification.hide {
                transform: translateX(100%);
            }
            
            .notification-success { background: #28a745; }
            .notification-error { background: #dc3545; }
            .notification-info { background: var(--color-secondary, #1b5962); }
            
            .lazy {
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .loaded {
                opacity: 1;
            }
            
            /* Enhanced product hover effects */
            .producto {
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            
            .producto:hover .producto-imagen img {
                transform: scale(1.05);
            }
            
            /* Smooth scrolling for all browsers */
            html {
                scroll-behavior: smooth;
            }
            
            /* Card content transitions */
            .card-content {
                transition: all 0.3s ease;
            }
            
            /* Better button interactions */
            .producto-btn, .hero .btn, .contacto button {
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            
            .producto-btn:hover, .hero .btn:hover, .contacto button:hover {
                transform: translateY(-2px);
            }
        `;
        
        document.head.appendChild(style);
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.isInitialized = false;
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('M&M Pallets App Error:', e.error);
});

// Initialize the application
const mmPalletsApp = new MMPalletsApp();

// Expose for debugging (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.mmPalletsApp = mmPalletsApp;
}