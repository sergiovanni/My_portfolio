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
            }, 1500, 'easeInOutExpo');

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
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // i18n
    var translations = {
        en: {
            "meta.title": "Sergio Giovanni HOUNSOU - Portfolio",
            "brand.name": "Sergio",
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
            "hero.badge": "Available for internship",
            "hero.im": "I'm",
            "hero.name": "Sergio Giovanni HOUNSOU",
            "hero.typed": "Full-stack Web Developer, UI/UX Enthusiast",
            "hero.download": "Download CV",
            "hero.play": "Play",
            "hero.videoTitle": "YouTube Video",
            "techorbit.title": "Technologies I work with",
            "character.comingSoon": "Illustration coming soon",
            "about.years": "Years",
            "about.experience": "of experience in web development",
            "about.p1": "I am a web developer in training at the IUT of Anglet, France. Curious, rigorous and passionate, I build modern, high-performance websites tailored to real user needs.",
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
            "softskills.team.desc": "Collaborate, listen, move forward together",
            "softskills.rigor": "Rigor",
            "softskills.rigor.desc": "Attention to detail at every step",
            "softskills.adapt": "Adaptability",
            "softskills.adapt.desc": "Adjust quickly to the unexpected",
            "softskills.organized": "Organization",
            "softskills.organized.desc": "Structure work to deliver better",
            "softskills.communication": "Communication",
            "softskills.communication.desc": "Explain the essentials clearly",
            "skills.experience": "Experience",
            "skills.education": "Education",
            "exp.khc.title": "Web Development Internship",
            "exp.khc.date": "2023 - 2024",
            "exp.khc.company": "Kapital Humain & Conseils, Cotonou",
            "exp.conciergerie.title": "Full-Stack Developer (Internship)",
            "exp.conciergerie.date": "2026",
            "exp.conciergerie.company": "La Clé Du Confort (Conciergerie Lara), France",
            "exp.gfc.title": "Professional Internship - Web Development",
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
            "contact.location": "Anglet, France",
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
            "footer.tagline": "Full-stack developer, currently looking for a work-study program.",
            "footer.quicklinks": "Quick Links",
            "footer.getintouch": "Get In Touch"
        },
        fr: {
            "meta.title": "Sergio Giovanni HOUNSOU - Portfolio",
            "brand.name": "Sergio",
            "nav.home": "Accueil",
            "nav.about": "A propos",
            "nav.skills": "Competences",
            "nav.services": "Services",
            "nav.projects": "Projets",
            "nav.team": "Interets",
            "nav.testimonial": "Valeur ajoutee",
            "nav.contact": "Contact",
            "nav.language": "FR / EN",
            "nav.english": "Anglais",
            "nav.french": "Francais",
            "hero.badge": "Disponible pour une alternance",
            "hero.im": "Je suis",
            "hero.name": "Sergio Giovanni HOUNSOU",
            "hero.typed": "Développeur Web Full-stack, Data Analyst Junior, Passionné UI/UX",
            "hero.download": "Télecharger le CV",
            "hero.play": "Lire",
            "hero.videoTitle": "Video YouTube",
            "techorbit.title": "Mes Compétences techniques",
            "character.comingSoon": "Illustration a venir",
            "about.years": "Années",
            "about.experience": "d'experience en developpement web",
            "about.p1": "Je suis developpeur web en formation a l'IUT d'Anglet, en France. Curieux, rigoureux et passionne, je conçois des sites modernes et performants adaptes aux besoins des utilisateurs.",
            "about.teamwork": "Travail d'equipe",
            "about.organization": "Organisation et autonomie",
            "about.communication": "Communication claire",
            "about.readMore": "En savoir plus",
            "about.happy": "Stages realises",
            "about.p2": "Je transforme des idees en projets concrets en alliant technique, creativite et sens du detail.",
            "about.projects": "Projets realises",
            "about.p3": "Langues : francais et anglais. Centres d'interet : jeux video, sports et lecture.",
            "skills.title": "Competences & Experience",
            "skills.p1": "Bases solides en front-end et back-end, avec une attention a la qualite et aux bonnes pratiques.",
            "skills.subtitle": "Soft Skills",
            "techlevels.languages": "Langages",
            "techlevels.frameworks": "Frameworks",
            "techlevels.databases": "Bases de données",
            "techlevels.tools": "Outils & Méthodes",
            "softskills.team": "Esprit d'equipe",
            "softskills.team.desc": "Collaborer, ecouter, avancer ensemble",
            "softskills.rigor": "Rigueur",
            "softskills.rigor.desc": "Le souci du detail a chaque etape",
            "softskills.adapt": "Adaptabilite",
            "softskills.adapt.desc": "S'ajuster rapidement face a l'imprevu",
            "softskills.organized": "Organisation",
            "softskills.organized.desc": "Structurer pour mieux livrer",
            "softskills.communication": "Communication",
            "softskills.communication.desc": "Expliquer simplement l'essentiel",
            "skills.experience": "Experience",
            "skills.education": "Formation",
            "exp.khc.title": "Stage Developpement Web",
            "exp.khc.date": "2023 - 2024",
            "exp.khc.company": "Kapital Humain & Conseils, Cotonou",
            "exp.conciergerie.title": "Développeur Full-Stack (Stage)",
            "exp.conciergerie.date": "2026",
            "exp.conciergerie.company": "La Clé Du Confort (Conciergerie Lara), France",
            "exp.gfc.title": "Stage Professionnel - Developpement Web",
            "exp.gfc.date": "2025",
            "exp.gfc.company": "Global Freedom Corporation, Cotonou",
            "exp.egb.title": "Stage - Initiation au Developpement Web",
            "exp.egb.date": "2022",
            "exp.egb.company": "e-gbavou, Cotonou",
            "edu.but.title": "BUT 3 Informatique",
            "edu.but.date": "2025",
            "edu.but.school": "UPPA/IUT Bayonne et Pays de l'Adour",
            "edu.licence.title": "Licence Informatique",
            "edu.licence.date": "2024",
            "edu.licence.school": "ENEAM - Cotonou, Benin",
            "edu.bac.title": "Baccalaureat Scientifique D",
            "edu.bac.date": "2020",
            "edu.bac.school": "College Catholique St Michel, Cotonou",
            "service.title": "Ce que je propose",
            "service.cta": "Disponible",
            "service.webapp": "Applications web",
            "service.front": "Integration front-end",
            "service.backend": "Back-end & bases de donnees",
            "service.uiux": "UI/UX & maquettes",
            "service.note": "Disponible pour une alternance",
            "service.p1": "Developpement d'applications web modernes, from scratch ou en reprise, avec une architecture claire.",
            "service.p2": "Interfaces responsives, accessibles et animees avec HTML, CSS, JavaScript et Bootstrap.",
            "service.p3": "APIs, logique metier, modelisation UML et gestion de donnees avec MySQL.",
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
            "team.title": "Centres d'interet",
            "team.interest1": "Jeux video",
            "team.interest1.desc": "Esprit d'analyse et strategie",
            "team.interest2": "Sports",
            "team.interest2.desc": "Energie, discipline et perseverance",
            "team.interest3": "Lecture",
            "team.interest3.desc": "Curiosite et apprentissage continu",
            "cta.title": "Collaborons ensemble",
            "cta.subtitle": "Un projet en tête ? Discutons-en !",
            "cta.button": "Contact",
            "testimonial.title": "Ce que j'apporte",
            "testimonial.p1": "Rigueur, sens du detail et respect des delais pour des livrables propres et maintenables.",
            "testimonial.name1": "Qualite",
            "testimonial.role1": "Focus sur l'excellence",
            "testimonial.p2": "Ecoute active et collaboration pour transformer les besoins en solutions claires.",
            "testimonial.name2": "Collaboration",
            "testimonial.role2": "Communication fluide",
            "testimonial.p3": "Curiosite et veille continue pour progresser et proposer des solutions modernes.",
            "testimonial.name3": "Apprentissage",
            "testimonial.role3": "Evolution constante",
            "contact.title": "Travaillons ensemble",
            "contact.cta": "Dire bonjour",
            "contact.office": "Localisation :",
            "contact.location": "Anglet, France",
            "contact.call": "Appelez-moi :",
            "contact.mail": "Ecrivez-moi :",
            "contact.follow": "Suivez-moi :",
            "form.name": "Votre nom",
            "form.email": "Votre email",
            "form.subject": "Sujet",
            "form.message": "Message",
            "form.messagePlaceholder": "Laissez un message ici",
            "form.send": "Envoyer le message",
            "form.sending": "Envoi en cours...",
            "form.success": "Merci ! Votre message a bien ete envoye, je vous repondrai rapidement.",
            "form.error": "Une erreur est survenue. Reessayez ou ecrivez-moi directement par email.",
            "footer.rights": "&copy; <a class=\"border-bottom text-secondary\" href=\"#\">Sergio Giovanni HOUNSOU</a>, Tous droits reserves.",
            "footer.tagline": "Developpeur full-stack, actuellement a la recherche d'une alternance.",
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


    // Contact form submission
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

        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(function(response) {
                return response.json().then(function(data) {
                    return { ok: response.ok, data: data };
                });
            })
            .then(function(result) {
                if (result.ok && result.data.ok) {
                    $status.addClass('text-success').text(t['form.success']);
                    $form[0].reset();
                } else {
                    $status.addClass('text-danger').text((result.data && result.data.error) || t['form.error']);
                }
            })
            .catch(function() {
                $status.addClass('text-danger').text(t['form.error']);
            })
            .finally(function() {
                $submit.prop('disabled', false).text(t['form.send']);
            });
    });


})(jQuery);