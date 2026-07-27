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
       THEME TOGGLE — Dark / Light
       (Vanta n'est pas encore charge a ce stade : on ne fait
       que poser l'attribut + prevenir Vanta plus tard s'il existe.)
    ══════════════════════════════════════════ */
    var THEME_KEY = 'portfolio-theme';
    var themeToggleBtn = document.getElementById('themeToggle');

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        if (window.__vantaEffect && typeof window.__vantaEffect.setOptions === 'function') {
            try {
                window.__vantaEffect.setOptions({
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

})();
