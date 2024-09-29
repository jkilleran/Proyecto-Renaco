document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;

    // Función para mostrar la siguiente imagen
    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    images[currentIndex].classList.add('active');
    setInterval(showNextImage, 5000); // Cambiar de imagen cada 5 segundos
});
