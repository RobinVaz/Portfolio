// Carrousel
const prevBtn = document.querySelector('.carousel-button.prev');
const nextBtn = document.querySelector('.carousel-button.next');
const carouselSlides = document.querySelector('.carousel-container');
let index = 0;
let isAnimating = false;

function showSlide(n) {
    if (isAnimating) return; 
    isAnimating = true;
    const totalSlides = carouselSlides.children.length;
    
    // Gérer les boucles du carrousel
    if (n >= totalSlides) {
        index = 0; // Revenir à la première image
    } else if (n < 0) {
        index = totalSlides - 1; // Revenir à la dernière image
    } else {
        index = n;
    }

    // Animation de la transition des images
    carouselSlides.style.transition = 'transform 0.5s ease';
    carouselSlides.style.transform = `translateX(-${index * 100}%)`;

    // Désactiver l'animation après 0.5s (temps de la transition)
    setTimeout(() => isAnimating = false, 500);
}

// Événements pour les flèches de navigation
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => showSlide(index - 1)); // Bouton précédent
    nextBtn.addEventListener('click', () => showSlide(index + 1)); // Bouton suivant
}

// Automatique - changer d'image toutes les 3 secondes
setInterval(() => showSlide(index + 1), 3000);

// Validation du formulaire
const form = document.querySelector('.contact form');
form.addEventListener('submit', function(event) {
    const prenom = form.querySelector('#first-name').value;
    const nom = form.querySelector('#last-name').value;
    const email = form.querySelector('#email').value; // Nouveau champ
    const message = form.querySelector('#message').value;
    const rgpdChecked = form.querySelector('#rgpd').checked;

    // Supprimer les erreurs précédentes
    form.querySelectorAll('.error').forEach(error => error.remove());

    let valid = true;

    // Vérification des champs obligatoires
    if (!prenom) {
        showError(form.querySelector('#first-name'), 'Le prénom est requis.');
        valid = false;
    }
    if (!nom) {
        showError(form.querySelector('#last-name'), 'Le nom est requis.');
        valid = false;
    }
    if (!email) {
        showError(form.querySelector('#email'), 'L\'adresse email est requise.');
        valid = false;
    } else if (!isValidEmail(email)) {
        showError(form.querySelector('#email'), 'L\'adresse email n\'est pas valide.');
        valid = false;
    }
    if (!message) {
        showError(form.querySelector('#message'), 'Le message est requis.');
        valid = false;
    }
    if (!rgpdChecked) {
        showError(form.querySelector('#rgpd'), 'Vous devez accepter les conditions de confidentialité.');
        valid = false;
    }

    // Si un champ est invalide, empêcher l'envoi du formulaire
    if (!valid) {
        event.preventDefault();
    }
});

// Fonction pour afficher les erreurs
function showError(inputElement, message) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.style.color = 'red';
    errorElement.textContent = message;

    // Afficher l'erreur sous le champ concerné
    inputElement.parentNode.appendChild(errorElement);
    inputElement.style.borderColor = 'red'; // Changer la couleur de la bordure pour indiquer l'erreur
}

// Fonction de validation de l'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sélectionne tous les éléments affectés par le mode sombre
const elementsToToggle = [
    document.body,
    document.querySelector('header'),
    ...document.querySelectorAll('.projet-container .projet'),
    document.querySelector('.contact'),
    ...document.querySelectorAll('.creator'),
    document.querySelector('.about'),
    document.querySelector('footer')
];

const toggleButton = document.querySelector('.theme-toggle');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

