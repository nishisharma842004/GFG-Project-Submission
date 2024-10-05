// JavaScript for enhancing user interaction on the home page
document.addEventListener('DOMContentLoaded', function() {
    console.log("Welcome to the Yoga & Sports for Wellness Page!");
    // Add more JavaScript functions as needed
});
// gfg.js

// Slideshow for Yoga Poses
let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.querySelectorAll('.slides');
    slides.forEach(slide => slide.style.display = 'none');
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Toggle sections visibility
document.addEventListener('DOMContentLoaded', () => {
    const yogaSection = document.querySelector('#yoga');
    const mealSection = document.querySelector('#meals');
    const sportsSection = document.querySelector('#sports');
    const recoverySection = document.querySelector('#recovery');
    const competitionSection = document.querySelector('#competitions');

    yogaSection.addEventListener('click', () => yogaSection.classList.toggle('hidden'));
    mealSection.addEventListener('click', () => mealSection.classList.toggle('hidden'));
    sportsSection.addEventListener('click', () => sportsSection.classList.toggle('hidden'));
    recoverySection.addEventListener('click', () => recoverySection.classList.toggle('hidden'));
    competitionSection.addEventListener('click', () => competitionSection.classList.toggle('hidden'));
});

