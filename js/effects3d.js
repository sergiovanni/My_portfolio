(function () {
    'use strict';

    /* ══════════════════════════════════════════
       SCROLL PROGRESS BAR
    ══════════════════════════════════════════ */
    var progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', function () {
        var scrolled = window.scrollY;
        var total = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (scrolled / total * 100) + '%';
    }, { passive: true });


    /* ══════════════════════════════════════════
       CUSTOM CURSOR
    ══════════════════════════════════════════ */
    var cursor = document.querySelector('.cursor');
    var follower = document.querySelector('.cursor-follower');
    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var followerX = mouseX;
    var followerY = mouseY;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }, { passive: true });

    (function tickFollower() {
        followerX += (mouseX - followerX) * 0.13;
        followerY += (mouseY - followerY) * 0.13;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(tickFollower);
    })();

    document.querySelectorAll('a, button, [data-tilt], #portfolio-flters li, .portfolio-item, .service-item').forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', function () {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });


    /* ══════════════════════════════════════════
       VANTA.JS NET — Fond 3D hero
    ══════════════════════════════════════════ */
    var vantaNetEffect = null;
    try {
        if (typeof VANTA !== 'undefined' && VANTA.NET) {
            vantaNetEffect = VANTA.NET({
                el: '#home',
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                scale: 1.0,
                scaleMobile: 1.0,
                color: 0x00d4ff,
                backgroundColor: 0x080b14,
                points: 10.0,
                maxDistance: 22.0,
                spacing: 18.0,
                showDots: true
            });
        }
    } catch (err) {
        console.error('Vanta init failed:', err);
    }


    /* ══════════════════════════════════════════
       THEME TOGGLE — Dark / Light
    ══════════════════════════════════════════ */
    var THEME_KEY = 'portfolio-theme';
    var themeToggleBtn = document.getElementById('themeToggle');

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        if (vantaNetEffect && typeof vantaNetEffect.setOptions === 'function') {
            try {
                vantaNetEffect.setOptions({
                    color: theme === 'light' ? 0x0099c2 : 0x00d4ff,
                    backgroundColor: theme === 'light' ? 0xeef1f6 : 0x080b14
                });
            } catch (err) {
                console.error('Vanta setOptions failed:', err);
            }
        }
    }

    applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            var isLight = document.documentElement.getAttribute('data-theme') === 'light';
            var next = isLight ? 'dark' : 'light';
            localStorage.setItem(THEME_KEY, next);
            applyTheme(next);
        });
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
       SERVICE CAROUSEL — 3D coverflow
    ══════════════════════════════════════════ */
    (function () {
        var track = document.querySelector('.service-carousel-track');
        if (!track) return;

        var items = Array.prototype.slice.call(track.querySelectorAll('.service-carousel-item'));
        var dots = Array.prototype.slice.call(document.querySelectorAll('.service-carousel-dot'));
        var prevBtn = document.querySelector('.service-carousel-nav.prev');
        var nextBtn = document.querySelector('.service-carousel-nav.next');
        var total = items.length;
        var active = 0;

        function isPairMode() { return window.innerWidth >= 768; }

        function ndFor(i, activeIdx) {
            return ((i - activeIdx) % total + total) % total;
        }

        /* Position "physique" de gauche à droite (peu importe le mode), pour
           détecter les sauts qui ne sont pas un simple glissement d'un cran. */
        function slotFor(i, activeIdx, pairMode) {
            if (pairMode) {
                var nd = ndFor(i, activeIdx);
                return (nd + 1) % 4; /* PL=0, L=1, R=2, PR=3 */
            }
            var diff = i - activeIdx;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;
            return diff + 2; /* -2..2 -> 0..4, centre = 2 */
        }

        function render(prevActive) {
            var pairMode = isPairMode();

            items.forEach(function (item, i) {
                var tx, scale, rotate, opacity, z, blur, isFront;

                /* Avec seulement 4 cartes et pas de carte tampon cachée, une carte
                   doit forcément "sauter" d'un bord à l'autre à chaque clic. On
                   détecte ce saut (déplacement de plus d'un cran) et on coupe sa
                   transition le temps du saut pour qu'elle se repositionne
                   instantanément au lieu de traverser tout l'écran. */
                if (typeof prevActive === 'number') {
                    var oldSlot = slotFor(i, prevActive, pairMode);
                    var newSlot = slotFor(i, active, pairMode);
                    var isFarSwap = Math.abs(newSlot - oldSlot) > 1;
                    item.style.transition = isFarSwap ? 'none' : '';
                    if (isFarSwap) {
                        (function (el) {
                            requestAnimationFrame(function () {
                                requestAnimationFrame(function () { el.style.transition = ''; });
                            });
                        })(item);
                    }
                } else {
                    item.style.transition = '';
                }

                if (pairMode) {
                    /* diff normalisé 0..3 : 0=carte active gauche, 1=carte active droite,
                       2=carte suivante (bord droit), 3=carte precedente (bord gauche) */
                    var nd = ndFor(i, active);
                    isFront = nd === 0 || nd === 1;

                    if (nd === 0)      { tx = '-50% - 185px'; scale = 1;    rotate = 6;   opacity = 1;    z = 3; blur = 0; }
                    else if (nd === 1) { tx = '-50% + 185px'; scale = 1;    rotate = -6;  opacity = 1;    z = 3; blur = 0; }
                    else if (nd === 2) { tx = '-50% + 560px'; scale = 0.72; rotate = -30; opacity = 0.28; z = 1; blur = 3; }
                    else               { tx = '-50% - 560px'; scale = 0.72; rotate = 30;  opacity = 0.28; z = 1; blur = 3; }

                    item.style.transform = 'translateX(calc(' + tx + ')) scale(' + scale + ') rotateY(' + rotate + 'deg)';
                    item.style.filter = blur ? 'blur(' + blur + 'px)' : 'none';
                    item.style.pointerEvents = 'auto';
                } else {
                    var diff = i - active;
                    if (diff > total / 2) diff -= total;
                    if (diff < -total / 2) diff += total;

                    var abs = Math.abs(diff);
                    var sign = diff > 0 ? 1 : -1;
                    isFront = abs === 0;

                    if (abs === 0)      { tx = '-50%'; scale = 1;    rotate = 0;          opacity = 1;    z = 3; }
                    else if (abs === 1) { tx = '-50% + ' + (diff * 78) + '%'; scale = 0.8; rotate = -diff * 28; opacity = 0.55; z = 2; }
                    else if (abs === 2) { tx = '-50% + ' + (sign * 130) + '%'; scale = 0.62; rotate = -sign * 34; opacity = 0; z = 1; }
                    else                { tx = '-50% + ' + (sign * 160) + '%'; scale = 0.5; rotate = 0; opacity = 0; z = 0; }

                    item.style.transform = 'translateX(calc(' + tx + ')) scale(' + scale + ') rotateY(' + rotate + 'deg)';
                    item.style.filter = 'none';
                    item.style.pointerEvents = abs <= 1 ? 'auto' : 'none';
                }

                item.style.opacity = opacity;
                item.style.zIndex = z;
                item.classList.toggle('is-front', isFront);
            });

            dots.forEach(function (dot, i) {
                dot.classList.toggle('active', i === active);
            });
        }

        window.addEventListener('resize', function () {
            clearTimeout(window.__serviceCarouselResizeT);
            window.__serviceCarouselResizeT = setTimeout(function () { render(); }, 150);
        });

        function goTo(index) {
            var prevActive = active;
            active = ((index % total) + total) % total;
            render(prevActive);
        }

        function next() { goTo(active + 1); }
        function prev() { goTo(active - 1); }

        items.forEach(function (item, i) {
            item.addEventListener('click', function () {
                if (i === active) return;

                if (!isPairMode()) { goTo(i); return; }

                /* En mode "paire", cliquer une carte doit avancer/reculer d'un
                   seul cran (comme les flèches), pas sauter directement à sa
                   position : la carte de droite (active ou floutée) avance
                   d'un cran, celle de gauche recule d'un cran. */
                var nd = ndFor(i, active);
                if (nd === 1 || nd === 2) next();
                else prev();
            });
        });

        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                goTo(parseInt(dot.getAttribute('data-index'), 10));
            });
        });

        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);

        var startX = null;
        track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', function (e) {
            if (startX === null) return;
            var deltaX = e.changedTouches[0].clientX - startX;
            if (Math.abs(deltaX) > 40) { deltaX < 0 ? next() : prev(); }
            startX = null;
        });

        render();
    })();


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
    gsap.from('#portfolio-flters li', {
        scrollTrigger: st('#portfolio-flters', 'top 85%'),
        opacity: 0, y: -20, duration: 0.5, stagger: 0.1, ease: 'back.out(2)'
    });
    gsap.from('.portfolio-item', {
        scrollTrigger: st('.portfolio-container', 'top 82%'),
        opacity: 0, y: 55, scale: 0.9, duration: 0.65, stagger: 0.1, ease: 'back.out(1.2)'
    });


    /* ── TEAM / CENTRES D'INTÉRÊT ─────────────── */
    gsap.from('#team h1', {
        scrollTrigger: st('#team', 'top 82%'),
        opacity: 0, y: 30, duration: 0.8
    });
    gsap.from('.team-item', {
        scrollTrigger: st('#team .row.g-4', 'top 82%'),
        opacity: 0, y: 60, scale: 0.88, duration: 0.7, stagger: 0.2, ease: 'back.out(1.4)'
    });


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


    /* ── CHARACTER REVEAL ─────────────────────── */
    gsap.from('#character-reveal .character-placeholder', {
        scrollTrigger: st('#character-reveal', 'top 85%'),
        opacity: 0, y: 60, duration: 1, ease: 'power3.out'
    });


    /* ── FOOTER ───────────────────────────────── */
    gsap.from('.container-fluid.bg-dark .container', {
        scrollTrigger: st('.container-fluid.bg-dark', 'top 95%'),
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
