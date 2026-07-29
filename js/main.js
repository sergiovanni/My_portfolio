(function($) {
    "use strict";

    // Loader — reste visible jusqu'au chargement reel de la page (images incluses),
    // avec une duree minimum pour eviter un flash trop rapide sur les chargements en cache.
    var loaderShownAt = Date.now();
    var MIN_LOADER_MS = 500;
    $(window).on('load', function() {
        var remaining = Math.max(0, MIN_LOADER_MS - (Date.now() - loaderShownAt));
        setTimeout(function() {
            $('#spinner').removeClass('show');
        }, remaining);
    });


    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 700, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 700, 'easeInOutExpo');
        return false;
    });


    // i18n
    var translations = {
        en: {
            "meta.title": "Sergio Giovanni HOUNSOU - Portfolio",
            "nav.home": "Home",
            "nav.about": "About",
            "nav.skills": "Skills",
            "nav.services": "Services",
            "nav.projects": "Projects",
            "nav.team": "Interests",
            "nav.testimonial": "What I Bring",
            "nav.contact": "Contact",
            "nav.language": "FR / EN",
            "nav.english": "English",
            "nav.french": "French",
            "hero.badge": "Looking for a work-study program",
            "hero.im": "I'm",
            "hero.name": "Sergio Giovanni HOUNSOU",
            "hero.typed": "Data Analyst - Full-Stack Developer",
            "hero.download": "Download CV",
            "hero.play": "Play",
            "hero.videoTitle": "YouTube Video",
            "techorbit.title": "Technologies I work with",
            "about.years": "Years",
            "about.experience": "of experience in full-stack web development",
            "about.p1": "I'm a Master's student in Data & Artificial Intelligence, with two years of experience in full-stack web development. I design modern applications and combine that with data analysis and modeling to make informed decisions.",
            "about.teamwork": "Teamwork mindset",
            "about.organization": "Organization and autonomy",
            "about.communication": "Clear communication",
            "about.readMore": "Learn more",
            "about.happy": "Internships completed",
            "about.p2": "I turn ideas into concrete projects by combining technique, creativity and attention to detail.",
            "about.projects": "Projects delivered",
            "about.p3": "Languages: French and English. Interests: video games, sports and reading.",
            "skills.title": "Skills & Experience",
            "skills.p1": "Strong foundations in front-end and back-end development, with a focus on quality and best practices.",
            "skills.subtitle": "Soft Skills",
            "techlevels.languages": "Languages",
            "techlevels.frameworks": "Frameworks",
            "techlevels.databases": "Databases",
            "techlevels.tools": "Tools & Methods",
            "softskills.team": "Teamwork",
            "softskills.rigor": "Rigor",
            "softskills.adapt": "Adaptability",
            "softskills.organized": "Organization",
            "softskills.communication": "Communication",
            "skills.experience": "Experience",
            "skills.education": "Education",
            "exp.khc.title": "Web Development Internship",
            "exp.khc.date": "2023 - 2024",
            "exp.khc.company": "Kapital Humain & Conseils, Cotonou",
            "exp.conciergerie.title": "Full-Stack Developer (Internship)",
            "exp.conciergerie.date": "2026",
            "exp.conciergerie.company": "La Clé Du Confort (Conciergerie Lara), France",
            "exp.gfc.title": "Junior Data Analyst",
            "exp.gfc.date": "2025",
            "exp.gfc.company": "Global Freedom Corporation, Cotonou",
            "exp.egb.title": "Intro to Web Development Internship",
            "exp.egb.date": "2022",
            "exp.egb.company": "e-gbavou, Cotonou",
            "edu.but.title": "BUT 3 Computer Science",
            "edu.but.date": "2025",
            "edu.but.school": "UPPA/IUT Bayonne et Pays de l'Adour",
            "edu.licence.title": "Computer Science Bachelor",
            "edu.licence.date": "2024",
            "edu.licence.school": "ENEAM - Cotonou, Benin",
            "edu.bac.title": "Science Baccalaureate",
            "edu.bac.date": "2020",
            "edu.bac.school": "College Catholique St Michel, Cotonou",
            "service.title": "What I Offer",
            "service.cta": "Available",
            "service.webapp": "Web applications",
            "service.front": "Front-end integration",
            "service.backend": "Back-end & databases",
            "service.uiux": "UI/UX & wireframes",
            "service.note": "Open to internship or work-study",
            "service.p1": "Building modern web applications from scratch or improving existing ones with a clear architecture.",
            "service.p2": "Responsive, accessible interfaces with HTML, CSS, JavaScript and Bootstrap.",
            "service.p3": "APIs, business logic, UML modeling and data management with MySQL.",
            "service.p4": "Clean wireframes and user flows aligned with real product goals.",
            "projects.title": "Projects",
            "projects.all": "All",
            "projects.webapps": "Web apps",
            "projects.websites": "Websites",
            "projects.kpayroll": "K-Payroll",
            "projects.kpayroll.stack": "Django, Vue.js, MySQL",
            "projects.kprospects": "K-Prospects",
            "projects.kprospects.stack": "Laravel, Bootstrap, MySQL",
            "projects.gfc": "Global Freedom Corporation",
            "projects.gfc.stack": "Laravel, Bootstrap",
            "projects.egbavou": "e-gbavou website mockup",
            "projects.egbavou.stack": "HTML, CSS, JavaScript",
            "projects.university": "University project",
            "projects.university.stack": "UML, MySQL, documentation",
            "projects.portfolio": "Personal portfolio",
            "projects.portfolio.stack": "HTML, CSS, JavaScript",
            "team.title": "Interests",
            "team.interest1": "Video games",
            "team.interest1.desc": "Strategy and analytical thinking",
            "team.interest2": "Sports",
            "team.interest2.desc": "Discipline and perseverance",
            "team.interest3": "Reading",
            "team.interest3.desc": "Curiosity and continuous learning",
            "cta.title": "Let's collaborate",
            "cta.subtitle": "Got a project in mind? Let's talk about it!",
            "cta.button": "Contact",
            "testimonial.title": "What I Bring",
            "testimonial.p1": "Rigor, attention to detail and respect for deadlines to deliver clean, maintainable work.",
            "testimonial.name1": "Quality",
            "testimonial.role1": "Focused on excellence",
            "testimonial.p2": "Active listening and collaboration to turn needs into clear solutions.",
            "testimonial.name2": "Collaboration",
            "testimonial.role2": "Clear communication",
            "testimonial.p3": "Curiosity and continuous learning to propose modern solutions.",
            "testimonial.name3": "Learning",
            "testimonial.role3": "Always evolving",
            "contact.title": "Let's work together",
            "contact.cta": "Say hello",
            "contact.office": "Location:",
            "contact.location": "Lille, France",
            "contact.call": "Call me:",
            "contact.mail": "Email me:",
            "contact.follow": "Follow me:",
            "form.name": "Your Name",
            "form.email": "Your Email",
            "form.subject": "Subject",
            "form.message": "Message",
            "form.messagePlaceholder": "Leave a message here",
            "form.send": "Send Message",
            "form.sending": "Sending...",
            "form.success": "Thanks! Your message has been sent, I'll reply soon.",
            "form.error": "Something went wrong. Please try again or email me directly.",
            "footer.rights": "&copy; <a class=\"border-bottom text-secondary\" href=\"#\">Sergio Giovanni HOUNSOU</a>, All rights reserved.",
            "footer.tagline": "Junior Data Analyst - Full-Stack Developer<br>Currently looking for a work-study program.",
            "footer.quicklinks": "Quick Links",
            "footer.getintouch": "Get In Touch"
        },
        fr: {
            "meta.title": "Sergio Giovanni HOUNSOU - Portfolio",
            "nav.home": "Accueil",
            "nav.about": "À propos",
            "nav.skills": "Compétences",
            "nav.services": "Services",
            "nav.projects": "Projets",
            "nav.team": "Intérêts",
            "nav.testimonial": "Valeur ajoutée",
            "nav.contact": "Contact",
            "nav.language": "FR / EN",
            "nav.english": "Anglais",
            "nav.french": "Français",
            "hero.badge": "À la recherche d'une alternance",
            "hero.im": "Je suis",
            "hero.name": "Sergio Giovanni HOUNSOU",
            "hero.typed": "Data Analyst Junior, Développeur Full-Stack",
            "hero.download": "Télécharger le CV",
            "hero.play": "Lire",
            "hero.videoTitle": "Présentation vidéo",
            "techorbit.title": "Mes Compétences techniques",
            "about.years": "Années",
            "about.experience": "d'expérience en développement full-stack",
            "about.p1": "Étudiant en Master 1 Data & Intelligence Artificielle, avec deux années d'expérience en développement web full-stack. Je conçois des applications modernes en alliant technique et analyse de données pour prendre les meilleures décisions.",
            "about.teamwork": "Travail d'équipe",
            "about.organization": "Organisation et autonomie",
            "about.communication": "Communication claire",
            "about.readMore": "En savoir plus",
            "about.happy": "Stages réalisés",
            "about.p2": "Je transforme des idées en projets concrets en alliant technique, créativité et sens du détail.",
            "about.projects": "Projets réalisés",
            "about.p3": "Langues : français et anglais. Centres d'intérêt : jeux vidéo, sports et lecture.",
            "skills.title": "Compétences & Expérience",
            "skills.p1": "Bases solides en front-end et back-end, avec une attention à la qualité et aux bonnes pratiques.",
            "skills.subtitle": "Soft Skills",
            "techlevels.languages": "Langages",
            "techlevels.frameworks": "Frameworks",
            "techlevels.databases": "Bases de données",
            "techlevels.tools": "Outils & Méthodes",
            "softskills.team": "Esprit d'équipe",
            "softskills.rigor": "Rigueur",
            "softskills.adapt": "Adaptabilité",
            "softskills.organized": "Organisation",
            "softskills.communication": "Communication",
            "skills.experience": "Expérience",
            "skills.education": "Formation",
            "exp.khc.title": "Stage Développement Web",
            "exp.khc.date": "2023 - 2024",
            "exp.khc.company": "Kapital Humain & Conseils, Cotonou",
            "exp.conciergerie.title": "Développeur Full-Stack (Stage)",
            "exp.conciergerie.date": "2026",
            "exp.conciergerie.company": "La Clé Du Confort (Conciergerie Lara), France",
            "exp.gfc.title": "Data Analyst Junior",
            "exp.gfc.date": "2025",
            "exp.gfc.company": "Global Freedom Corporation, Cotonou",
            "exp.egb.title": "Stage - Initiation au Développement Web",
            "exp.egb.date": "2022",
            "exp.egb.company": "e-gbavou, Cotonou",
            "edu.but.title": "BUT 3 Informatique",
            "edu.but.date": "2025",
            "edu.but.school": "UPPA/IUT Bayonne et Pays de l'Adour",
            "edu.licence.title": "Licence Informatique",
            "edu.licence.date": "2024",
            "edu.licence.school": "ENEAM - Cotonou, Bénin",
            "edu.bac.title": "Baccalauréat Scientifique D",
            "edu.bac.date": "2020",
            "edu.bac.school": "Collège Catholique St Michel, Cotonou",
            "service.title": "Ce que je propose",
            "service.cta": "Disponible",
            "service.webapp": "Applications web",
            "service.front": "Intégration front-end",
            "service.backend": "Back-end & bases de données",
            "service.uiux": "UI/UX & maquettes",
            "service.note": "Disponible pour une alternance",
            "service.p1": "Développement d'applications web modernes, from scratch ou en reprise, avec une architecture claire.",
            "service.p2": "Interfaces responsives, accessibles et animées avec HTML, CSS, JavaScript et Bootstrap.",
            "service.p3": "APIs, logique métier, modélisation UML et gestion de données avec MySQL.",
            "service.p4": "Conception de maquettes claires et parcours utilisateurs efficaces.",
            "projects.title": "Mes projets",
            "projects.all": "Tous",
            "projects.webapps": "Applications web",
            "projects.websites": "Sites web",
            "projects.kpayroll": "K-Payroll",
            "projects.kpayroll.stack": "Django, Vue.js, MySQL",
            "projects.kprospects": "K-Prospects",
            "projects.kprospects.stack": "Laravel, Bootstrap, MySQL",
            "projects.gfc": "Global Freedom Corporation",
            "projects.gfc.stack": "Laravel, Bootstrap",
            "projects.egbavou": "Maquette site e-gbavou",
            "projects.egbavou.stack": "HTML, CSS, JavaScript",
            "projects.university": "Projet universitaire",
            "projects.university.stack": "UML, MySQL, documentation",
            "projects.portfolio": "Portfolio personnel",
            "projects.portfolio.stack": "HTML, CSS, JavaScript",
            "team.title": "Centres d'intérêt",
            "team.interest1": "Jeux vidéo",
            "team.interest1.desc": "Esprit d'analyse et stratégie",
            "team.interest2": "Sports",
            "team.interest2.desc": "Énergie, discipline et persévérance",
            "team.interest3": "Lecture",
            "team.interest3.desc": "Curiosité et apprentissage continu",
            "cta.title": "Collaborons ensemble",
            "cta.subtitle": "Un projet en tête ? Discutons-en !",
            "cta.button": "Contact",
            "testimonial.title": "Ce que j'apporte",
            "testimonial.p1": "Rigueur, sens du détail et respect des délais pour des livrables propres et maintenables.",
            "testimonial.name1": "Qualité",
            "testimonial.role1": "Focus sur l'excellence",
            "testimonial.p2": "Écoute active et collaboration pour transformer les besoins en solutions claires.",
            "testimonial.name2": "Collaboration",
            "testimonial.role2": "Communication fluide",
            "testimonial.p3": "Curiosité et veille continue pour progresser et proposer des solutions modernes.",
            "testimonial.name3": "Apprentissage",
            "testimonial.role3": "Évolution constante",
            "contact.title": "Travaillons ensemble",
            "contact.cta": "Dire bonjour",
            "contact.office": "Localisation :",
            "contact.location": "Lille, France",
            "contact.call": "Appelez-moi :",
            "contact.mail": "Écrivez-moi :",
            "contact.follow": "Suivez-moi :",
            "form.name": "Votre nom",
            "form.email": "Votre email",
            "form.subject": "Sujet",
            "form.message": "Message",
            "form.messagePlaceholder": "Laissez un message ici",
            "form.send": "Envoyer le message",
            "form.sending": "Envoi en cours...",
            "form.success": "Merci ! Votre message a bien été envoyé, je vous répondrai rapidement.",
            "form.error": "Une erreur est survenue. Réessayez ou écrivez-moi directement par email.",
            "footer.rights": "&copy; <a class=\"border-bottom text-secondary\" href=\"#\">Sergio Giovanni HOUNSOU</a>, Tous droits réservés.",
            "footer.tagline": "Data analyst Junior - Développeur Full-Stack<br>Actuellement à la recherche d'une alternance.",
            "footer.quicklinks": "Liens rapides",
            "footer.getintouch": "Me contacter"
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

        $('[data-i18n]').each(function() {
            var key = $(this).data('i18n');
            if (translations[lang][key]) {
                $(this).text(translations[lang][key]);
            }
        });

        $('[data-i18n-html]').each(function() {
            var key = $(this).data('i18n-html');
            if (translations[lang][key]) {
                $(this).html(translations[lang][key]);
            }
        });

        $('[data-i18n-placeholder]').each(function() {
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
        return 'fr';
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function() {
        $videoSrc = $(this).data("src");
    });
    $('#videoModal').on('shown.bs.modal', function(e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    });
    $('#videoModal').on('hide.bs.modal', function(e) {
        $("#video").attr('src', $videoSrc);
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function() {
        $('.progress .progress-bar').each(function() {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
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
    $(document).on('click', '.lang-option', function() {
        var lang = $(this).data('lang');
        applyTranslations(lang);
    });


    // Contact form submission — EmailJS (100% cote navigateur, aucun backend requis)
    var EMAILJS_PUBLIC_KEY = 'LDUD3_CflnrHktbeV';
    var EMAILJS_SERVICE_ID = 'service_kadk3b7';
    var EMAILJS_TEMPLATE_ID = 'template_ll4gzup';

    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    $('#contactForm').on('submit', function(event) {
        event.preventDefault();

        var $form = $(this);
        var $submit = $('#contactSubmit');
        var $status = $('#contactFormStatus');
        var lang = detectLanguage();
        var t = translations[lang];

        var payload = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            subject: $('#subject').val().trim(),
            message: $('#message').val().trim()
        };

        $submit.prop('disabled', true).text(t['form.sending']);
        $status.removeClass('text-success text-danger').text('');

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload)
            .then(function() {
                $status.addClass('text-success').text(t['form.success']);
                $form[0].reset();
            })
            .catch(function(err) {
                console.error('EmailJS error:', err);
                $status.addClass('text-danger').text(t['form.error']);
            })
            .finally(function() {
                $submit.prop('disabled', false).text(t['form.send']);
            });
    });


})(jQuery);