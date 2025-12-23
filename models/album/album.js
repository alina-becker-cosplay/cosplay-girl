let currentIndex = 0;
let images = [];

// Prepare image list
window.onload = () => {
  images = [...document.querySelectorAll(".photo-card img")].map(img => img.src);
  showPage(1); // existing pagination init
};

// When an image is clicked
document.addEventListener("click", function(e) {
  if (e.target.matches(".photo-card img")) {
    currentIndex = images.indexOf(e.target.src);
    openLightbox(currentIndex);
  }
});

function openLightbox(index) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = images[index];
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Next / Prev
function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  openLightbox(currentIndex);
}

/* ------- Mobile Swipe Support -------- */
let startX = 0;

document.getElementById("lightbox").addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.getElementById("lightbox").addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  if (diff > 50) changeImage(-1);   // swipe right
  if (diff < -50) changeImage(1);   // swipe left
});
