(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // i18n
    var translations = {
        en: {
            "meta.title": "ProMan - Personal Portfolio HTML Template",
            "nav.home": "Home",
            "nav.about": "About",
            "nav.skills": "Skills",
            "nav.services": "Services",
            "nav.projects": "Projects",
            "nav.team": "Team",
            "nav.testimonial": "Testimonial",
            "nav.contact": "Contact",
            "nav.language": "Language",
            "nav.english": "English",
            "nav.french": "French",
            "hero.im": "I'm",
            "hero.typed": "Full-stack Web Developer, Web Designer",
            "hero.download": "Download CV",
            "hero.play": "Play",
            "hero.videoTitle": "YouTube Video",
            "about.years": "Years",
            "about.experience": "of working experience as a web designer & developer",
            "about.p1": "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos.",
            "about.prices": "Affordable Prices",
            "about.quality": "High Quality Product",
            "about.ontime": "On Time Project Delivery",
            "about.readMore": "Read More",
            "about.happy": "Happy Clients",
            "about.p2": "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam amet diam ipsum clita labore dolor duo clita.",
            "about.projects": "Projects Completed",
            "about.p3": "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam amet diam ipsum clita labore dolor duo clita.",
            "skills.title": "Skills & Experience",
            "skills.p1": "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum clita dolor duo clita sit.",
            "skills.subtitle": "My Skills",
            "skills.experience": "Experience",
            "skills.education": "Education",
            "skills.uiDesigner": "UI Designer",
            "skills.productDesigner": "Product Designer",
            "skills.webDesigner": "Web Designer",
            "skills.appsDesigner": "Apps Designer",
            "skills.uiCourse": "UI Design Course",
            "skills.iosDev": "IOS Development",
            "skills.webDesign": "Web Design",
            "skills.appsDesign": "Apps Design",
            "service.title": "My Services",
            "service.cta": "Hire Me",
            "service.creative": "Creative Design",
            "service.graphic": "Graphic Design",
            "service.web": "Web Design",
            "service.uiux": "UI/UX Design",
            "service.price": "Start from <span class=\"text-primary\">$199</span>",
            "service.p1": "Stet lorem dolor diam amet vero eos. No stet est diam amet diam ipsum. Clita dolor duo clita sit sed sit dolor eos.",
            "service.p2": "Stet lorem dolor diam amet vero eos. No stet est diam amet diam ipsum. Clita dolor duo clita sit sed sit dolor eos.",
            "service.p3": "Stet lorem dolor diam amet vero eos. No stet est diam amet diam ipsum. Clita dolor duo clita sit sed sit dolor eos.",
            "service.p4": "Stet lorem dolor diam amet vero eos. No stet est diam amet diam ipsum. Clita dolor duo clita sit sed sit dolor eos.",
            "projects.title": "My Projects",
            "projects.all": "All Projects",
            "projects.uiux": "UI/UX Design",
            "projects.graphic": "Graphic Design",
            "team.title": "Team Members",
            "team.cta": "Contact Us",
            "team.name": "Full Name",
            "team.role": "Designer",
            "testimonial.title": "Testimonial",
            "testimonial.name": "Client Name",
            "testimonial.role": "Profession",
            "contact.title": "Let's Work Together",
            "contact.cta": "Say Hello",
            "contact.office": "My office:",
            "contact.call": "Call me:",
            "contact.mail": "Mail me:",
            "contact.follow": "Follow me:",
            "contact.formNote": "The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href=\"https://htmlcodex.com/contact-form\">Download Now</a>.",
            "form.name": "Your Name",
            "form.email": "Your Email",
            "form.subject": "Subject",
            "form.message": "Message",
            "form.messagePlaceholder": "Leave a message here",
            "form.send": "Send Message",
            "footer.rights": "&copy; <a class=\"border-bottom text-secondary\" href=\"#\">Your Site Name</a>, All Right Reserved.",
            "footer.designed": "Designed By",
            "footer.distributed": "Distributed By:"
        },
        fr: {
            "meta.title": "ProMan - Portfolio Personnel",
            "nav.home": "Accueil",
            "nav.about": "À propos",
            "nav.skills": "Compétences",
            "nav.services": "Services",
            "nav.projects": "Projets",
            "nav.team": "Équipe",
            "nav.testimonial": "Témoignages",
            "nav.contact": "Contact",
            "nav.language": "Langue",
            "nav.english": "Anglais",
            "nav.french": "Français",
            "hero.im": "Je suis",
            "hero.typed": "Développeur Web Full-stack, Web Designer",
            "hero.download": "Télécharger le CV",
            "hero.play": "Lire",
            "hero.videoTitle": "Vidéo YouTube",
            "about.years": "Années",
            "about.experience": "d'expérience en tant que web designer et développeur",
            "about.p1": "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos.",
            "about.prices": "Prix abordables",
            "about.quality": "Produit de haute qualité",
            "about.ontime": "Livraison dans les délais",
            "about.readMore": "En savoir plus",
            "about.happy": "Clients satisfaits",
            "about.p2": "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam amet diam ipsum clita labore dolor duo clita.",
            "about.projects": "Projets réalisés",
            "about.p3": "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam amet diam ipsum clita labore dolor duo clita.",
            "skills.title": "Compétences & Expérience",
            "skills.p1": "Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum clita dolor duo clita sit.",
            "skills.subtitle": "Mes compétences",
            "skills.experience": "Expérience",
            "skills.education": "Formation",
            "skills.uiDesigner": "Designer UI",
            "skills.productDesigner": "Designer produit",
            "skills.webDesigner": "Web Designer",
            "skills.appsDesigner": "Designer d'apps",
            "skills.uiCourse": "Cours de design UI",
            "skills.iosDev": "Développement iOS",
            "skills.webDesign": "Web Design",
            "skills.appsDesign": "Design d'apps",
            "service.title": "Mes services",
            "service.cta": "Engagez-moi",
            "service.creative": "Design créatif",
            "service.graphic": "Design graphique",
            "service.web": "Design web",
            "service.uiux": "Design UI/UX",
            "service.price": "À partir de <span class=\"text-primary\">$199</span>",
            "service.p1": "Stet lorem dolor diam amet vero eos. No stet est diam amet diam ipsum. Clita dolor duo clita sit sed sit dolor eos.",
            "service.p2": "Stet lorem dolor diam amet vero eos. No stet est diam amet diam ipsum. Clita dolor duo clita sit sed sit dolor eos.",
            "service.p3": "Stet lorem dolor diam amet vero eos. No stet est diam amet diam ipsum. Clita dolor duo clita sit sed sit dolor eos.",
            "service.p4": "Stet lorem dolor diam amet vero eos. No stet est diam amet diam ipsum. Clita dolor duo clita sit sed sit dolor eos.",
            "projects.title": "Mes projets",
            "projects.all": "Tous les projets",
            "projects.uiux": "Design UI/UX",
            "projects.graphic": "Design graphique",
            "team.title": "Membres de l'équipe",
            "team.cta": "Contactez-nous",
            "team.name": "Nom complet",
            "team.role": "Designer",
            "testimonial.title": "Témoignages",
            "testimonial.name": "Nom du client",
            "testimonial.role": "Profession",
            "contact.title": "Travaillons ensemble",
            "contact.cta": "Dire bonjour",
            "contact.office": "Mon bureau :",
            "contact.call": "Appelez-moi :",
            "contact.mail": "Écrivez-moi :",
            "contact.follow": "Suivez-moi :",
            "contact.formNote": "Le formulaire de contact est actuellement inactif. Obtenez un formulaire fonctionnel avec Ajax & PHP en quelques minutes. Copiez-collez les fichiers, ajoutez un peu de code et c'est terminé. <a href=\"https://htmlcodex.com/contact-form\">Télécharger</a>.",
            "form.name": "Votre nom",
            "form.email": "Votre email",
            "form.subject": "Sujet",
            "form.message": "Message",
            "form.messagePlaceholder": "Laissez un message ici",
            "form.send": "Envoyer le message",
            "footer.rights": "&copy; <a class=\"border-bottom text-secondary\" href=\"#\">Nom de votre site</a>, Tous droits réservés.",
            "footer.designed": "Conçu par",
            "footer.distributed": "Distribué par :"
        }
    };

    var typedInstance = null;

    function initTyped() {
        if ($('.typed-text-output').length == 1) {
            if (typedInstance) {
                typedInstance.destroy();
            }
            var typed_strings = $('.typed-text').text();
            typedInstance = new Typed('.typed-text-output', {
                strings: typed_strings.split(', '),
                typeSpeed: 100,
                backSpeed: 20,
                smartBackspace: false,
                loop: true
            });
        }
    }

    function applyTranslations(lang) {
        if (!translations[lang]) {
            return;
        }

        document.documentElement.setAttribute('lang', lang);
        document.title = translations[lang]["meta.title"] || document.title;

        $('[data-i18n]').each(function () {
            var key = $(this).data('i18n');
            if (translations[lang][key]) {
                $(this).text(translations[lang][key]);
            }
        });

        $('[data-i18n-html]').each(function () {
            var key = $(this).data('i18n-html');
            if (translations[lang][key]) {
                $(this).html(translations[lang][key]);
            }
        });

        $('[data-i18n-placeholder]').each(function () {
            var key = $(this).data('i18n-placeholder');
            if (translations[lang][key]) {
                $(this).attr('placeholder', translations[lang][key]);
            }
        });

        var typedKey = $('.typed-text').data('i18n-typed');
        if (typedKey && translations[lang][typedKey]) {
            $('.typed-text').text(translations[lang][typedKey]);
        }

        initTyped();
        localStorage.setItem('lang', lang);
    }

    function detectLanguage() {
        var stored = localStorage.getItem('lang');
        if (stored && translations[stored]) {
            return stored;
        }
        var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
        return browserLang.startsWith('fr') ? 'fr' : 'en';
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    // Language switcher init
    applyTranslations(detectLanguage());
    $(document).on('click', '.lang-option', function () {
        var lang = $(this).data('lang');
        applyTranslations(lang);
    });

    
})(jQuery);

