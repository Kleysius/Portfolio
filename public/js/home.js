// Light/Dark mode
const themeButton = document.querySelector('.light-mode');

themeButton.addEventListener('click', () => {
    const body = document.body;

    if (body.classList.contains('dark')) {
        body.classList.add('light');
        body.classList.remove('dark');
        themeButton.innerHTML = '<i class="bx bx-moon"></i>';
    } else if(body.classList.contains('light')) {
        body.classList.add('dark');
        body.classList.remove('light');
        themeButton.innerHTML = '<i class="bx bx-sun"></i>';
    }

});

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

// Ajouter des confettis avec canvas
function ajouterConfettis() {
    const canvas = document.getElementById("confettis");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const confettis = [];

    canvas.style.display = "block";
    canvas.classList.add("confettis-small");

    const gravite = 0.015; // Valeur de la gravité

    function dessinerConfettis() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        confettis.forEach(confetti => {
            context.save();
            context.translate(confetti.x, confetti.y);
            context.rotate(confetti.angle);
            context.fillStyle = confetti.couleur;
            context.fillRect(-confetti.longueur / 2, -confetti.largeur / 2, confetti.longueur, confetti.largeur);
            context.restore();

            confetti.vitesseY += gravite; // Ajout de la gravité
            confetti.x += confetti.vitesseX;
            confetti.y += confetti.vitesseY;
            confetti.angle += 0.06;
        });

        requestAnimationFrame(dessinerConfettis);
    }

    for (let i = 0; i < 120; i++) {
        confettis.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            longueur: Math.random() * 20, // Longueur du confetti
            largeur: Math.random() * 6 + 3, // Largeur du confetti
            vitesseX: (Math.random() - 0.5) * 8,
            vitesseY: (Math.random() - 0.5) * 8,
            angle: Math.random() * 2 * Math.PI,
            couleur: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
        });
    }

    dessinerConfettis();
}

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
let glowingCircle = document.querySelector(".glowing-circle");
let heroSci = document.querySelector(".hero-sci");

window.addEventListener("scroll", () => {
    let value = window.scrollY;

    heroContent.style.transform = `translateX(-${value * 1.2}px)`;
    glowingCircle.style.transform = `translateX(${value * 1.2}px)`;
    heroSci.style.transform = `translateX(-${value * 1.2}px)`;
});

// Rediriger vers la page de connexion après 5 clics sur le logo
let logoLink = document.querySelector('.secret-login');
let clickCount = 0;

logoLink.addEventListener('click', function(event) {
    clickCount++;

    if (clickCount === 5) {
        window.location.href = '/login';
    }

    // Empêcher le comportement par défaut du lien
    event.preventDefault();
});

// menu burger
