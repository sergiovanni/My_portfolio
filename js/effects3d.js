(function () {
    'use strict';

    /* ══════════════════════════════════════════
       VANTA.JS NET — Fond 3D hero
       (le curseur, la barre de progression, le bouton de theme et le
       carousel de services sont geres tot dans js/ui-early.js, pour
       rester cliquables sans attendre Three.js/Vanta/GSAP.)
    ══════════════════════════════════════════ */
    var vantaNetEffect = null;
    try {
        if (typeof VANTA !== 'undefined' && VANTA.NET) {
            var isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
            vantaNetEffect = VANTA.NET({
                el: '#home',
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                scale: 1.0,
                scaleMobile: 1.0,
                color: isLightTheme ? 0x0099c2 : 0x00d4ff,
                backgroundColor: isLightTheme ? 0xeef1f6 : 0x080b14,
                points: 10.0,
                maxDistance: 22.0,
                spacing: 18.0,
                showDots: true
            });
            window.__vantaEffect = vantaNetEffect;
        }
    } catch (err) {
        console.error('Vanta init failed:', err);
    }


    /* ══════════════════════════════════════════
       VANILLA-TILT — Cartes services
    ══════════════════════════════════════════ */
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 12,
            speed: 400,
            glare: true,
            'max-glare': 0.15,
            scale: 1.03
        });
    }


    /* ══════════════════════════════════════════
       PARALLAX SOURIS — Image hero
    ══════════════════════════════════════════ */
    var heroImg = document.querySelector('.hero-img-wrapper');
    if (heroImg) {
        document.addEventListener('mousemove', function (e) {
            var xShift = ((e.clientX / window.innerWidth) - 0.5) * 18;
            var yShift = ((e.clientY / window.innerHeight) - 0.5) * 10;
            heroImg.style.transform = 'translate(' + xShift + 'px, ' + yShift + 'px)';
        }, { passive: true });
    }


    /* ══════════════════════════════════════════
       GSAP SCROLL ANIMATIONS
    ══════════════════════════════════════════ */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    /* Les positions de déclenchement sont calculées dès l'exécution de ce script,
       avant que toutes les images (notamment les grandes illustrations) aient fini
       de charger et modifié la hauteur de la page. Sans ce recalcul, les triggers
       situés après une image encore en cours de chargement restent décalés et ne
       se déclenchent jamais (éléments bloqués à opacité 0). */
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });

    /* Config par défaut */
    gsap.defaults({ ease: 'power3.out' });

    /* ── Helper : créer un ScrollTrigger rapide ── */
    function st(trigger, startPos) {
        return { trigger: trigger, start: startPos || 'top 82%' };
    }


    /* ── HERO ─────────────────────────────────── */
    setTimeout(function () {
        var tl = gsap.timeline();
        tl.from('.hero-badge',       { opacity: 0, y: -22, duration: 0.6 })
          .from('#home h3',          { opacity: 0, y: 28,  duration: 0.7 }, '-=0.3')
          .from('#home h1',          { opacity: 0, y: 40,  duration: 0.8 }, '-=0.45')
          .from('.typed-text-output',{ opacity: 0, y: 22,  duration: 0.6 }, '-=0.35')
          .from('#home .pt-5',       { opacity: 0, y: 20,  duration: 0.6 }, '-=0.25')
          .from('.fixed-social',     { opacity: 0, x: -18, duration: 0.5 }, '-=0.2')
          .from('.hero-img-wrapper', { opacity: 0, x: 70,  duration: 1.1, ease: 'power4.out' }, '-=1.2');
    }, 200);

    /* Parallax scroll sur l'image hero */
    gsap.to('.hero-img-wrapper', {
        y: 120,
        ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });


    /* ── TECH ORBIT ──────────────────────────────── */
    gsap.from('#tech-orbit .tech-orbit-character img', {
        scrollTrigger: st('#tech-orbit', 'top 80%'),
        opacity: 0, x: -60, duration: 1, ease: 'power3.out'
    });
    gsap.from('#tech-orbit .tech-orbit-title', {
        scrollTrigger: st('#tech-orbit', 'top 85%'),
        opacity: 0, y: 20, duration: 0.6
    });
    gsap.from('#tech-orbit .orbit-wrapper', {
        scrollTrigger: st('#tech-orbit', 'top 78%'),
        opacity: 0, scale: 0.7, duration: 1, ease: 'back.out(1.4)'
    });
    gsap.fromTo('.tech-marquee-section',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, scrollTrigger: st('.tech-marquee-section', 'top 90%') }
    );
    gsap.fromTo('.tech-level-card',
        { opacity: 0, y: 30 },
        {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: st('.tech-levels-grid', 'top 85%')
        }
    );


    /* ── ABOUT ────────────────────────────────── */
    var aboutTl = gsap.timeline({ scrollTrigger: st('#about', 'top 75%') });
    aboutTl
        .from('#about .years .display-1', { opacity: 0, x: -80, scale: 0.7, duration: 1.0 })
        .from('#about .years h5',         { opacity: 0, x: -40, duration: 0.6 }, '-=0.5')
        .from('#about h3.lh-base',        { opacity: 0, y: 30,  duration: 0.7 }, '-=0.4')
        .from('#about p.mb-4',            { opacity: 0, y: 20,  duration: 0.6 }, '-=0.3')
        .from('#about .mb-3 i',           { opacity: 0, scale: 0, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, '-=0.2')
        .from('#about .mb-3 span',        { opacity: 0, x: -20, duration: 0.4, stagger: 0.12 }, '-=0.8');

    /* Statistiques (counters) */
    gsap.from('#about h2.text-primary', {
        scrollTrigger: st('#about .col-lg-6:last-child', 'top 80%'),
        opacity: 0, scale: 0.4, duration: 0.7, stagger: 0.25, ease: 'back.out(2)'
    });
    gsap.fromTo('#about .col-lg-6:last-child .about-img-placeholder',
        { opacity: 0, x: 60, scale: 0.9 },
        {
            scrollTrigger: st('#about .col-lg-6:last-child', 'top 80%'),
            opacity: 0.5, x: 0, scale: 1, duration: 0.8, stagger: 0.2
        }
    );
    gsap.from('#about .d-flex.align-items-center.mb-3', {
        scrollTrigger: st('#about .col-lg-6:last-child', 'top 80%'),
        opacity: 0, y: 20, duration: 0.6, stagger: 0.2, delay: 0.3
    });


    /* ── SKILLS ───────────────────────────────── */
    var skillTl = gsap.timeline({ scrollTrigger: st('#skill', 'top 78%') });
    skillTl
        .from('#skill h1.display-5',   { opacity: 0, x: -50, duration: 0.8 })
        .from('#skill p',              { opacity: 0, y: 18,  duration: 0.6 }, '-=0.4')
        .from('.soft-skills-card-title', { opacity: 0, x: -25, duration: 0.6 }, '-=0.3')
        .fromTo('.soft-skill-row',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out' },
            '-=0.2'
        );

    gsap.from('.skill-tabs', {
        scrollTrigger: st('.skill-tabs', 'top 85%'),
        opacity: 0, y: -20, duration: 0.6, ease: 'back.out(2)'
    });
    gsap.from('.timeline-item', {
        scrollTrigger: st('.timeline', 'top 82%'),
        opacity: 0, x: 40, duration: 0.6, stagger: 0.15, ease: 'power2.out'
    });


    /* ── SERVICES ─────────────────────────────── */
    gsap.from('#service .row.g-5.mb-5 h1', {
        scrollTrigger: st('#service', 'top 82%'),
        opacity: 0, y: 30, duration: 0.8
    });
    gsap.from('.service-carousel', {
        scrollTrigger: st('.service-carousel', 'top 82%'),
        opacity: 0, y: 60, scale: 0.94, duration: 0.8, ease: 'power3.out'
    });


    /* ── PROJECTS ─────────────────────────────── */
    gsap.from('#project h1', {
        scrollTrigger: st('#project', 'top 82%'),
        opacity: 0, y: 30, duration: 0.8
    });
    gsap.fromTo('#portfolio-flters li',
        { opacity: 0, y: -20 },
        {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)',
            scrollTrigger: st('#portfolio-flters', 'top 85%')
        }
    );
    gsap.fromTo('.portfolio-item',
        { opacity: 0, y: 55, scale: 0.9 },
        {
            opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'back.out(1.2)',
            scrollTrigger: st('.portfolio-container', 'top 82%')
        }
    );


    /* ── TEAM / CENTRES D'INTÉRÊT ─────────────── */
    gsap.from('#team h1', {
        scrollTrigger: st('#team', 'top 82%'),
        opacity: 0, y: 30, duration: 0.8
    });
    gsap.fromTo('.team-item',
        { opacity: 0, y: 60, scale: 0.88 },
        {
            opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: 'back.out(1.4)',
            scrollTrigger: st('#team .row.g-4', 'top 82%')
        }
    );

    /* ── CTA BANNER ────────────────────────────── */
    gsap.fromTo('.cta-banner-section',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: st('.cta-banner-section', 'top 85%') }
    );


    /* ── TESTIMONIALS ─────────────────────────── */
    gsap.from('#testimonial h1', {
        scrollTrigger: st('#testimonial', 'top 82%'),
        opacity: 0, y: 30, duration: 0.8
    });
    gsap.from('.testimonial-left img', {
        scrollTrigger: st('#testimonial', 'top 78%'),
        opacity: 0, x: -50, scale: 0.5, duration: 0.6, stagger: 0.18, ease: 'back.out(2)'
    });
    gsap.from('.testimonial-right img', {
        scrollTrigger: st('#testimonial', 'top 78%'),
        opacity: 0, x: 50, scale: 0.5, duration: 0.6, stagger: 0.18, ease: 'back.out(2)'
    });
    gsap.from('.testimonial-item', {
        scrollTrigger: st('#testimonial .col-lg-6', 'top 78%'),
        opacity: 0, y: 40, scale: 0.92, duration: 0.9
    });


    /* ── CONTACT ──────────────────────────────── */
    gsap.from('#contact h1', {
        scrollTrigger: st('#contact', 'top 82%'),
        opacity: 0, y: 30, duration: 0.8
    });
    gsap.from('#contact .col-lg-5', {
        scrollTrigger: st('#contact .row.g-5', 'top 82%'),
        opacity: 0, x: -60, duration: 0.85
    });
    gsap.from('#contact .col-lg-7', {
        scrollTrigger: st('#contact .row.g-5', 'top 82%'),
        opacity: 0, x: 60, duration: 0.85, delay: 0.12
    });
    gsap.from('#contact .row.g-3 > div', {
        scrollTrigger: st('#contact form', 'top 85%'),
        opacity: 0, y: 25, duration: 0.5, stagger: 0.1, delay: 0.3
    });


    /* ── FOOTER ───────────────────────────────── */
    gsap.from('.footer-section .footer-top', {
        scrollTrigger: st('.footer-section', 'top 95%'),
        opacity: 0, y: 20, duration: 0.6
    });


    /* ── PARALLAX BACKGROUNDS ─────────────────── */
    /* Léger mouvement vertical des sections au scroll */
    [['#about', 40], ['#skill', -40], ['#service', 40], ['#project', -30], ['#team', 40]].forEach(function (pair) {
        gsap.to(pair[0] + ' .container', {
            y: pair[1],
            ease: 'none',
            scrollTrigger: { trigger: pair[0], start: 'top bottom', end: 'bottom top', scrub: 2 }
        });
    });

})();
