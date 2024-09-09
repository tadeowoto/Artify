
const carouselImages = document.querySelectorAll('.carousel-image');

const mainImage = document.getElementById('main-image');

carouselImages.forEach(image => {
  image.addEventListener('click', () => {
    mainImage.src = image.src;
  });
});