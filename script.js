/**
 * ==========================================
 * NARULA & SONS HOTELS — INTERACTIVE ENGINE
 * ==========================================
 * Features:
 * 1. Anti-gravity floating elements (mouse repulsion)
 * 2. Scroll-triggered reveal animations
 * 3. Animated number counters
 * 4. Financial bar animations
 * 5. PPT Slideshow with auto-play
 * 6. Navbar scroll behavior
 * 7. Mobile hamburger menu
 * 8. Hero particle system
 * 9. Smooth scrolling
 * 10. Contact form handling
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. HERO PARTICLE SYSTEM
    // ========================================
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (6 + Math.random() * 6) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
            particlesContainer.appendChild(p);
        }
    }

    // ========================================
    // 2. ANTI-GRAVITY FLOATING ELEMENTS
    // ========================================
    const floatingElements = document.querySelectorAll('.float-obj');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Anti-gravity physics for floating elements
    class FloatingObject {
        constructor(el) {
            this.el = el;
            this.speed = parseFloat(el.dataset.speed) || 1;
            this.x = 0;
            this.y = 0;
            this.vx = 0;
            this.vy = 0;
            this.baseX = 0;
            this.baseY = 0;
            this.damping = 0.92;
            this.springForce = 0.01;
            this.repulsionRadius = 200;
            this.repulsionForce = 0.4;
        }

        update() {
            const rect = this.el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            // Mouse repulsion
            const dx = cx - mouseX;
            const dy = cy - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.repulsionRadius && dist > 0) {
                const force = (this.repulsionRadius - dist) / this.repulsionRadius * this.repulsionForce * this.speed;
                this.vx += (dx / dist) * force;
                this.vy += (dy / dist) * force;
            }

            // Spring back to base
            this.vx += (this.baseX - this.x) * this.springForce;
            this.vy += (this.baseY - this.y) * this.springForce;

            // Apply damping
            this.vx *= this.damping;
            this.vy *= this.damping;

            // Update position
            this.x += this.vx;
            this.y += this.vy;

            this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
    }

    const floaters = Array.from(floatingElements).map(el => new FloatingObject(el));

    function animateFloat() {
        floaters.forEach(f => f.update());
        requestAnimationFrame(animateFloat);
    }
    if (floaters.length > 0) {
        animateFloat();
    }

    // ========================================
    // 3. NAVBAR SCROLL BEHAVIOR
    // ========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ========================================
    // 4. MOBILE HAMBURGER MENU
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // ========================================
    // 5. SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // 6. ANIMATED NUMBER COUNTERS
    // ========================================
    function animateCounter(el, target, duration = 2000, prefix = '', suffix = '') {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * eased);

            el.textContent = prefix + current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // Infrastructure counters
    const infraCounters = document.querySelectorAll('.infra-counter');
    const infraObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target, 2500);
                infraObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    infraCounters.forEach(el => infraObserver.observe(el));

    // Financial counters
    const finCounters = document.querySelectorAll('.fin-counter');
    const finObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                const suffix = entry.target.dataset.suffix || '';
                const prefix = entry.target.dataset.prefix || '';
                animateCounter(entry.target, target, 2200, prefix, suffix);
                finObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    finCounters.forEach(el => finObserver.observe(el));

    // ========================================
    // 7. FINANCIAL BAR ANIMATIONS
    // ========================================
    const finBars = document.querySelectorAll('.fin-bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.setProperty('--bar-width', width + '%');
                entry.target.classList.add('animate');
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    finBars.forEach(el => barObserver.observe(el));

    // ========================================
    // 8. PPT SLIDESHOW
    // ========================================
    const slides = document.querySelectorAll('.ppt-slide');
    const dots = document.querySelectorAll('.ppt-dot');
    const prevBtn = document.getElementById('pptPrev');
    const nextBtn = document.getElementById('pptNext');
    let currentSlide = 0;
    let slideInterval;
    const SLIDE_INTERVAL = 6000;

    function goToSlide(index, direction = 'next') {
        // Remove active from current
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add(direction === 'next' ? 'exit-left' : '');
        dots[currentSlide].classList.remove('active');

        // Cleanup exit class
        const exitSlide = slides[currentSlide];
        setTimeout(() => exitSlide.classList.remove('exit-left'), 700);

        // Set new
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length, 'next');
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length, 'prev');
    }

    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }

    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    if (slides.length > 0) {
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const dir = i > currentSlide ? 'next' : 'prev';
                goToSlide(i, dir);
                resetAutoPlay();
            });
        });

        startAutoPlay();
    }

    // ========================================
    // 9. PARALLAX SCROLL EFFECTS
    // ========================================
    function handleParallax() {
        const scrollY = window.scrollY;

        // Hero parallax
        const heroBg = document.querySelector('.hero-bg-overlay');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        }

        // Floating elements parallax
        floatingElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 1;
            const yOffset = scrollY * speed * 0.1;
            // Combined with anti-gravity transform handled in the FloatingObject class
        });
    }
    window.addEventListener('scroll', handleParallax, { passive: true });

    // ========================================
    // 10. SMOOTH SCROLL FOR NAV LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80; // navbar height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // 11. CONTACT FORM
    // ========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span>✓ Message Sent Successfully!</span>';
            btn.style.background = 'linear-gradient(135deg, #2ECC71, #27AE60)';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // ========================================
    // 12. MAP MARKER INTERACTION
    // ========================================
    const markers = document.querySelectorAll('.marker');
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            marker.style.r = '12';
        });
        marker.addEventListener('mouseleave', () => {
            marker.style.r = '';
        });
    });

    // ========================================
    // 13. GALLERY ITEM CURSOR EFFECT
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
            item.style.transform = `perspective(500px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });

    // ========================================
    // 14. SUCCESS CARDS ANTI-GRAVITY
    // ========================================
    const successCards = document.querySelectorAll('.success-card');
    successCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212,175,55,0.08), var(--glass-bg))`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // ========================================
    // 15. ABOUT CARDS GLOW EFFECT
    // ========================================
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212,175,55,0.1), rgba(255,255,255,0.04))`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // ========================================
    // 16. TYPING / PRELOADER EFFECT
    // ========================================
    // Add a quick fade-in for the body on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    console.log('%c👑 Narula & Sons Hotels — Luxury Redefined', 
        'color: #D4AF37; font-size: 18px; font-weight: bold; font-family: Georgia;');
});
