const themeButton = document.querySelector('.light-mode');
let isLightMode = false;

themeButton.addEventListener('click', () => {
    const body = document.body;

    if (body.classList.contains('dark')) {
        body.classList.add('light');
        body.classList.remove('dark');
        themeButton.innerHTML = '<i class="bx bx-moon"></i>';
        isLightMode = true;
    } else if (body.classList.contains('light')) {
        body.classList.add('dark');
        body.classList.remove('light');
        themeButton.innerHTML = '<i class="bx bx-sun"></i>';
        isLightMode = false;
    }

    updateParticlesConfig();
});

function updateParticlesConfig() {
    const particlesConfig = {
        particles: {
            number: { value: 300, density: { enable: true, value_area: 800 } },
            color: { value: isLightMode ? "#000000" : "#ffffff" },
            shape: {
                type: "circle",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 },
                image: { src: "img/github.svg", width: 100, height: 100 }
            },
            opacity: {
                value: 1,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
            },
            size: {
                value: 2,
                random: true,
                anim: { enable: false, speed: 2, size_min: 0.3, sync: false }
            },
            line_linked: {
                enable: false,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 600 }
            }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: false, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 268, line_linked: { opacity: 1 } },
                bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    };

    particlesJS("particles-js", particlesConfig);
}

updateParticlesConfig();

// Scroll section active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });
};

// Masquer la div "iconTop" lorsque vous êtes sur la section "hero"
let heroSection = document.getElementById('home');
let iconTop = document.querySelector('.iconTop');

// Fonction de rappel pour l'Intersection Observer
const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // La section "hero" est visible à l'écran, masquer la div "iconTop"
            iconTop.style.display = 'none';
        } else {
            // La section "hero" n'est pas visible à l'écran, afficher la div "iconTop"
            iconTop.style.display = 'block';
        }
    });
};

// Créez l'Intersection Observer avec la fonction de rappel et les options spécifiées
const observer = new IntersectionObserver(handleIntersection, { threshold: 0 });

// Commencez à observer la section "hero"
observer.observe(heroSection);


// Faire s'écarter le hero-content, hero-image et hero-sci pour laisser place à la section about au scroll
let heroContent = document.querySelector(".hero-content");
let heroSci = document.querySelector(".hero-sci");
let heroImage = document.querySelector(".glowing-circle");

window.addEventListener("scroll", () => {
    if (window.innerWidth > 1100) {
        let value = window.scrollY;

        heroContent.style.transform = `translateX(-${value * 1.2}px)`;
        heroSci.style.transform = `translateX(-${value * 1.2}px)`;
        heroImage.style.transform = `translateX(${value * 1.2}px)`;
    }
});

// Rediriger vers la page de connexion après 5 clics sur le logo
let logoLink = document.querySelector('.secret-login');
let clickCount = 0;

logoLink.addEventListener('click', function (event) {
    clickCount++;

    if (clickCount === 5) {
        window.location.href = '/login';
    }

    // Empêcher le comportement par défaut du lien
    event.preventDefault();
});

// menu burger
const toggleBtn = document.querySelector('.toggleBtn');
const toggleBtnIcon = document.querySelector('.toggleBtn i');
const dropDownMenu = document.querySelector('.dropdownMenu');

toggleBtn.addEventListener('click', () => {
    dropDownMenu.classList.toggle('open');
    toggleBtnIcon.classList.toggle('bx-x');
});

// Animer la progress bar
let circularProgressList = document.querySelectorAll('.circular-progress');
// let progressValueList = document.querySelectorAll('.progress-value');

let progressEndValueList = [90, 85, 70, 60, 65];

let speed = 25;

function animateProgress() {
    circularProgressList.forEach((circularProgress, index) => {
        let progressEndValue = progressEndValueList[index];
        let progressStartValue = 0;
        const body = document.body;

        let progressAnimation = setInterval(() => {
            progressStartValue++;

            if (body.classList.contains('dark')) {
                circularProgress.style.background = `conic-gradient(#915FFF ${progressStartValue * 3.6}deg, #f1f1f1 0deg)`;
            } else {
                circularProgress.style.background = `conic-gradient(#915FFF ${progressStartValue * 3.6}deg, #e4dff0 0deg)`;
            }

            if (progressStartValue === progressEndValue) {
                clearInterval(progressAnimation);
            }
        }, speed);
    });
}

// Récupérer la référence de la section des compétences
const skillsSection = document.querySelector('#skills');

// Créer une instance de l'Intersection Observer
const observerSkills = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Si la section des compétences est visible dans la fenêtre visible, déclencher l'animation avec un delai d'1.2sec
            setTimeout(() => {
                animateProgress();
            }, 1200);
            // Réobserver la section des compétences pour relancer l'animation à chaque retour
            observerSkills.observe(entry.target);
        }
    });
});

// Observer la section des compétences
observerSkills.observe(skillsSection);

ScrollReveal().reveal('.about h2', {
    delay: 200,
    duration: 1200,
    distance: '100px',
    origin: 'left',
    reset: true
});

ScrollReveal().reveal('.about p', {
    delay: 400,
    duration: 1200,
    distance: '100px',
    origin: 'left',
    reset: true
});

ScrollReveal().reveal('.skills-text h2', {
    delay: 200,
    duration: 1200,
    distance: '100px',
    origin: 'bottom',
    reset: true
});

ScrollReveal().reveal('.skills-text p', {
    delay: 400,
    duration: 1200,
    distance: '100px',
    origin: 'bottom',
    reset: true
});

ScrollReveal().reveal('.container-skills', {
    delay: 600,
    duration: 1200,
    distance: '100px',
    origin: 'bottom',
    reset: true
});

ScrollReveal().reveal('.container-skills:nth-child(2n)', {
    delay: 600,
    duration: 1200,
    distance: '100px',
    origin: 'top',
    reset: true
});

ScrollReveal().reveal('.projects h2', {
    delay: 200,
    duration: 1200,
    distance: '100px',
    origin: 'top',
    reset: true
});

ScrollReveal().reveal('.project-item', {
    delay: 400,
    duration: 1200,
    distance: '100px',
    origin: 'top',
    reset: true
});

ScrollReveal().reveal('.project-item:nth-child(2n)', {
    delay: 400,
    duration: 1200,
    distance: '100px',
    origin: 'bottom',
    reset: true
});

ScrollReveal().reveal('.contact h2', {
    delay: 200,
    duration: 1200,
    distance: '100px',
    origin: 'top',
    reset: true
});

ScrollReveal().reveal('.contact form', {
    delay: 400,
    duration: 1200,
    distance: '100px',
    origin: 'bottom',
    reset: true
});