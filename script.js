/* ============================================================
   SCROLL-DRIVEN CANVAS ANIMATION
   ============================================================ */
const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index => (
  `ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1920;
canvas.height = 1080;

img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);
};

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

preloadImages();