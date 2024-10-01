document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;
    const totalImages = images.length;
    const footer = document.querySelector('.footer');

    // Función para actualizar las clases
    function updateClasses() {
        images.forEach((img, index) => {
            img.classList.remove('active');
            if (index === currentIndex) {
                img.classList.add('active');
            }
        });
    }

    // Función para mostrar la siguiente imagen
    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        updateClasses();
    }

    // Inicializar el carrusel
    updateClasses();
    setInterval(showNextImage, 5000); // Cambia de imagen cada 5 segundos

    // Mostrar el footer al llegar al final de la página
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;

        if (scrollTop + windowHeight >= bodyHeight - 10) { // Si el usuario está al final de la página
            footer.classList.add('show');
        } else {
            footer.classList.remove('show');
        }
    });
});