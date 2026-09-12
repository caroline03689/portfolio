/* ============================================
   Technical Writer Portfolio - Editorial Edition
   Interactions: nav, filter, scroll, progress
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Nav Toggle ---
    var navToggle = document.getElementById('nav-toggle');
    var navLinks  = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Navbar + Progress Bar on Scroll ---
    var navbar = document.getElementById('navbar');
    var progressBar = document.getElementById('progress-bar');
    var ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Navbar shadow
                if (window.scrollY > 10) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Progress bar
                if (progressBar) {
                    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                    var progress = (window.scrollY / scrollHeight) * 100;
                    progressBar.style.width = Math.min(progress, 100) + '%';
                }

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // --- Active Nav Link on Scroll ---
    var sections = document.querySelectorAll('section[id]');
    var navAnchors = document.querySelectorAll('.nav-links a');
    var scrollTicking = false;

    function updateActiveNav() {
        var current = '';
        var scrollPos = window.scrollY + 100;

        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navAnchors.forEach(function(link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // --- Portfolio Filter ---
    var filterTabs = document.getElementById('filter-tabs');
    var portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterTabs) {
        filterTabs.addEventListener('click', function(e) {
            var target = e.target.closest('.filter-tab');
            if (!target) return;

            filterTabs.querySelectorAll('.filter-tab').forEach(function(tab) {
                tab.classList.remove('active');
            });
            target.classList.add('active');

            var filter = target.getAttribute('data-filter');

            portfolioItems.forEach(function(item) {
                var category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    }

    // --- Scroll Fade-In Animation ---
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        var animatedElements = document.querySelectorAll(
            '.portfolio-item, .timeline-item, .contact-inner'
        );
        animatedElements.forEach(function(el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;

            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = 68;
                var pos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // --- Hero Card Stack Interaction ---
    var heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            heroCards.forEach(function(c) {
                if (c !== card) {
                    c.style.opacity = '0.5';
                }
            });
        });
        card.addEventListener('mouseleave', function() {
            heroCards.forEach(function(c) {
                c.style.opacity = '';
            });
        });
    });

    // --- Skills Hover Expand ---
    var skillRows = document.querySelectorAll('[data-skill-toggle]');
    skillRows.forEach(function(row) {
        var toggle = row.querySelector('.skill-toggle');
        row.addEventListener('mouseenter', function() {
            row.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
        });
        row.addEventListener('mouseleave', function() {
            row.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
        // Tap fallback for touch devices
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            var isOpen = row.classList.contains('open');
            // Close all other rows
            skillRows.forEach(function(r) {
                if (r !== row) {
                    r.classList.remove('open');
                    r.querySelector('.skill-toggle').setAttribute('aria-expanded', 'false');
                }
            });
            row.classList.toggle('open');
            toggle.setAttribute('aria-expanded', !isOpen);
        });
    });

    // --- Portfolio Modal ---
    var modal = document.getElementById('portfolio-modal');
    var modalContent = document.getElementById('modal-content');
    var modalTriggers = document.querySelectorAll('[data-modal]');
    var modalClosers = document.querySelectorAll('[data-modal-close]');

    if (modal && modalContent) {
        modalTriggers.forEach(function(trigger) {
            trigger.addEventListener('click', function(e) {
                var modalId = trigger.getAttribute('data-modal');
                var source = document.getElementById(modalId);
                if (!source) return;

                modalContent.innerHTML = source.innerHTML;
                modal.setAttribute('aria-hidden', 'false');
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';

                // Pause any preview videos that might be playing in the cards
                document.querySelectorAll('.portfolio-item video').forEach(function(pv) {
                    pv.pause();
                    pv.currentTime = 0;
                });

                // Autoplay videos inside the modal.
                // persona/data/animated diagram are muted due to copyrighted voiceovers;
                // explainer/demo play with sound.
                var mutedModals = ['modal-video-1', 'modal-video-2', 'modal-video-4'];
                var shouldMute = mutedModals.indexOf(modalId) !== -1;
                var modalVideos = modalContent.querySelectorAll('video');
                modalVideos.forEach(function(v) {
                    v.muted = shouldMute;
                    v.setAttribute('playsinline', '');
                    v.play().catch(function() {});
                });
            });
        });

        function closeModal() {
            // Pause and reset any playing video in the modal
            var modalVideos = modalContent.querySelectorAll('video');
            modalVideos.forEach(function(v) {
                v.pause();
                v.currentTime = 0;
            });

            // Also pause any preview videos still playing in the portfolio grid
            document.querySelectorAll('.portfolio-item video').forEach(function(pv) {
                pv.pause();
                pv.currentTime = 0;
            });

            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            setTimeout(function() {
                modalContent.innerHTML = '';
            }, 250);
        }

        modalClosers.forEach(function(closer) {
            closer.addEventListener('click', closeModal);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });
    }

    // --- Contact Popups ---
    function setupPopup(btnId, popupId) {
        var btn = document.getElementById(btnId);
        var popup = document.getElementById(popupId);

        if (btn && popup) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                // close other popups
                document.querySelectorAll('.contact-popup').forEach(function(p) {
                    if (p !== popup) p.classList.remove('open');
                });
                popup.classList.toggle('open');
            });

            document.addEventListener('click', function(e) {
                if (!popup.contains(e.target) && e.target !== btn) {
                    popup.classList.remove('open');
                }
            });
        }
    }

    setupPopup('hero-contact-btn', 'contact-popup');
    setupPopup('contact-email-trigger', 'contact-popup-bottom');

    // Initial calls
    updateActiveNav();
});
