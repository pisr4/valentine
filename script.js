const PASSWORD = "57";

/* ================= PASSWORD ================= */

function checkPassword() {
  const input = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (input === PASSWORD) {
    localStorage.setItem("access", "true");
    window.location.href = "app.html";
  } else {
    error.innerText = "عملالي نفسك ملكة التواريخ وحافظه كله 😅";
  }
}

if (window.location.pathname.includes("app.html")) {
  if (localStorage.getItem("access") !== "true") {
    window.location.href = "index.html";
  } else {
    showSection("love");
  }
}

/* ================= SECTION SWITCH ================= */

function showSection(id) {
  document.querySelectorAll("section").forEach(s =>
    s.classList.add("hidden")
  );

  document.getElementById(id).classList.remove("hidden");

  // لو دخلنا memories نخفي الـ proposal لو كان ظاهر
  if (id !== "memories") {
    document.getElementById("proposal").classList.remove("show");
  }
}

/* ================= AUDIO SYSTEM ================= */

document.addEventListener("DOMContentLoaded", () => {

  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const progress = document.querySelector(".progress");
  const progressContainer = document.querySelector(".progress-container");
  const videos = document.querySelectorAll("video");

  if (!audio) return;

  audio.volume = 0.7;
  audio.play().catch(()=>{});

  playBtn?.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.innerText = "⏸";
    } else {
      audio.pause();
      playBtn.innerText = "▶";
    }
  });

  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
  });

  progressContainer?.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
  });

  videos.forEach(video => {
    video.addEventListener("play", () => audio.pause());
    video.addEventListener("pause", () => audio.play().catch(()=>{}));
    video.addEventListener("ended", () => audio.play().catch(()=>{}));
  });

});

/* ================= PROPOSAL ================= */

function surprise() {
  document.getElementById("proposal").classList.add("show");
}

function yes() {
  document.getElementById("answer").innerText =
    "أحلي يسس في حياتي كلها💍❤️";

  document.getElementById("yesSound").play();
  document.body.classList.add("dark");

  for (let i = 0; i < 30; i++) createHeart();
}

function no() {
  document.getElementById("answer").innerText =
    "لا؟! 😂 طب فكري تاني بس… أنا مستني ❤️";
}

/* ================= HEARTS ================= */

function createHeart() {
  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 3 + 3) + "s";

  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}

/* ================= COUNTER TIMER (الجديد) ================= */

// غير التاريخ ده لتاريخكم الحقيقي (السنة، الشهر - 1، اليوم، الساعة، الدقيقة)
const START_DATE = new Date(2024, 6, 4, 0, 0, 0); 

function updateTimer() {
  const now = new Date();
  const diff = now - START_DATE;

  // الحسابات
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // التأكد إن العناصر موجودة في الصفحة قبل التحديث
  if (document.getElementById("days")) {
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }
}

// تحديث كل ثانية
setInterval(updateTimer, 1000);

updateTimer();
