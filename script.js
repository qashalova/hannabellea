const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");
const hannaName = document.getElementById("hannaName");

startBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name === "") {
    alert("Sila isi nama dulu 💕");
    return;
  }

  document.getElementById("page1").classList.add("hidden");
  document.getElementById("page2").classList.remove("hidden");
  greeting.textContent = `Hello ${name}! Happy Birthday to you 🎉🎂`;
  hannaName.textContent = name;
});

document.getElementById("toMessage").addEventListener("click", () => {
  document.getElementById("page2").classList.add("hidden");
  document.getElementById("page3").classList.remove("hidden");
});

document.getElementById("toCake").addEventListener("click", () => {
  document.getElementById("page3").classList.add("hidden");
  document.getElementById("page4").classList.remove("hidden");
});

// === Tambahan selepas kek muncul ===
const flame = document.querySelector(".flame");
const wishText = document.getElementById("wishText");
const nextAfterWish = document.getElementById("nextAfterWish");
const finalWish = document.getElementById("finalWish");
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Bila kek siap muncul, tunjuk arahan tekan lilin
setTimeout(() => {
  wishText.classList.remove("hidden");
}, 6000);

// Bila tekan lilin
flame.addEventListener("click", () => {
  flame.style.opacity = "0"; // padam api
  wishText.textContent = "💨 Make a wish...";
  setTimeout(startConfetti, 500);
  setTimeout(() => {
    wishText.classList.add("hidden");
    nextAfterWish.classList.remove("hidden");
  }, 3000);
});

// Confetti animation
let confetti = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createConfetti() {
  confetti = [];
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: random(0, confettiCanvas.width),
      y: random(-confettiCanvas.height, 0),
      r: random(3, 6),
      d: random(2, 5),
      color: `hsl(${random(320, 350)}, 80%, ${random(70, 90)}%)`,
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((c) => {
    c.y += c.d;
    if (c.y > confettiCanvas.height) c.y = -10;
  });
}

let confettiInterval;
function startConfetti() {
  confettiCanvas.classList.remove("hidden");
  createConfetti();
  confettiInterval = setInterval(() => {
    drawConfetti();
  }, 30);
  // confetti stop after 5s
  setTimeout(stopConfetti, 5000);
}

function stopConfetti() {
  clearInterval(confettiInterval);
  confettiCanvas.classList.add("hidden");
}

// Butang next selepas wish
nextAfterWish.addEventListener("click", () => {
  nextAfterWish.classList.add("hidden");
  finalWish.classList.remove("hidden");
});
