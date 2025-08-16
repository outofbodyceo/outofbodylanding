// CONFIG — update COUNT if you add/remove images
const COUNT = 22;
const BASE = "bed-bug-exterminator-removal-toronto-";
const DESKTOP_DIR = "images/desktop/";
const MOBILE_DIR  = "images/mobile/";
const INTERVAL_MS = 6000;

const slideshow = document.getElementById("slideshow");
let index = 1;

function makeSlide(n) {
  const num = String(n).padStart(2, "0");
  const d = `${DESKTOP_DIR}${BASE}${num}.webp`;
  const m = `${MOBILE_DIR}${BASE}${num}.webp`;

  const picture = document.createElement("picture");
  picture.className = "slide";

  const source = document.createElement("source");
  source.media = "(max-width: 767px)";
  source.srcset = m;

  const img = document.createElement("img");
  img.src = d;
  img.alt = ""; // decorative

  picture.appendChild(source);
  picture.appendChild(img);
  return picture;
}

function preload(n) {
  const num = String(n).padStart(2, "0");
  new Image().src = `${DESKTOP_DIR}${BASE}${num}.webp`;
  new Image().src = `${MOBILE_DIR}${BASE}${num}.webp`;
}

(function init() {
  const first = makeSlide(1);
  first.classList.add("show");
  slideshow.appendChild(first);
  preload(2); preload(3);
})();

function nextSlide() {
  index = (index % COUNT) + 1;
  const slide = makeSlide(index);
  slideshow.appendChild(slide);
  requestAnimationFrame(() => slide.classList.add("show"));
  while (slideshow.children.length > 2) slideshow.removeChild(slideshow.firstChild);
  preload((index % COUNT) + 1);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(nextSlide, INTERVAL_MS);
}
