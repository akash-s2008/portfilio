
const typing = document.getElementById("typing");

const words = [
  "Creative Developer",
  "Web Designer",
  "Tech Enthusiast",
  "Future Innovator"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];

  typing.textContent = deleting
    ? word.substring(0, charIndex - 1)
    : word.substring(0, charIndex + 1);

  charIndex += deleting ? -1 : 1;

  let delay = deleting ? 45 : 90;

  if (!deleting && charIndex === word.length) {
    deleting = true;
    delay = 1200;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 350;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();

// Profile photo upload
const photoUpload = document.getElementById("photoUpload");
const profilePhoto = document.getElementById("profilePhoto");
let currentPhotoURL = null;

photoUpload.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    this.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Please select an image smaller than 5 MB.");
    this.value = "";
    return;
  }

  const newURL = URL.createObjectURL(file);
  profilePhoto.src = newURL;

  if (currentPhotoURL) {
    URL.revokeObjectURL(currentPhotoURL);
  }

  currentPhotoURL = newURL;
});

// Create animated background stars
const stars = document.getElementById("stars");

for (let i = 0; i < 100; i++) {
  const star = document.createElement("span");
  star.className = "star";

  const size = Math.random() * 3 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.setProperty(
    "--duration",
    (Math.random() * 3 + 1) + "s"
  );

  stars.appendChild(star);
}

// Mouse-follow glow
const glow = document.getElementById("glow");

document.addEventListener("mousemove", function (event) {
  glow.style.left = event.clientX + "px";
  glow.style.top = event.clientY + "px";
});

// Dark / light theme toggle
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  themeBtn.textContent = isLight ? "🌙" : "☀️";
});

// Back-to-top button
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
  topBtn.classList.toggle("show", window.scrollY > 350);
});

topBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Reveal sections smoothly when scrolling
const sections = document.querySelectorAll(".section");

sections.forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(25px)";
  section.style.transition = "opacity .8s, transform .8s";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

sections.forEach(section => observer.observe(section));
