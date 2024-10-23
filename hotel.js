let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.card');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const slideWidth = slides[0].clientWidth;
    document.querySelector('.card-container').style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}
