/*************************************************
 * ⏰ IST REAL-TIME CLOCK (100% CORRECT)
 *************************************************/
const clock = document.getElementById("clock");

if (clock) {
  setInterval(() => {
    const now = new Date();
    clock.innerText =
      "⏰ IST: " +
      now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true
      });
  }, 1000);
}

/*************************************************
 * 📅 IST DATE HELPERS
 *************************************************/
function getISTDate() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
}

function getISTDateString() {
  return getISTDate().toISOString().split("T")[0];
}

const istNow = getISTDate();
const todayIST = getISTDateString();
const todayDate = istNow.getDate();
const month = istNow.getMonth(); // Feb = 1

/*************************************************
 * 🔥 DUOLINGO-STYLE STREAK (FIXED & ANIMATED)
 *************************************************/
let streak = Number(localStorage.getItem("streak")) || 0;
let longestStreak = Number(localStorage.getItem("longestStreak")) || 0;
let lastVisitDate = localStorage.getItem("lastVisitDate");

let streakUp = false;
let streakBroken = false;

if (!lastVisitDate) {
  streak = 1;
  streakUp = true;
} else {
  const last = new Date(lastVisitDate);
  const today = new Date(todayIST);

  const diffDays = Math.floor(
    (today - last) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) {
    streak++;
    streakUp = true;
  } else if (diffDays > 1) {
    streak = 1;
    streakBroken = true;
  }
}

if (streak > longestStreak) longestStreak = streak;

localStorage.setItem("streak", streak);
localStorage.setItem("longestStreak", longestStreak);
localStorage.setItem("lastVisitDate", todayIST);

const streakEl = document.getElementById("streak");
if (streakEl) {
  streakEl.innerHTML = `
    🔥 Streak: <b>${streak}</b><br>
    🏆 Longest: <b>${longestStreak}</b>
  `;
}

/*************************************************
 * 🔥 STREAK UP FIRE ANIMATION
 *************************************************/
if (streakUp) {
  for (let i = 0; i < 10; i++) {
    const fire = document.createElement("div");
    fire.innerText = "🔥";
    fire.style.position = "fixed";
    fire.style.left = "50%";
    fire.style.top = "25%";
    fire.style.fontSize = "22px";
    fire.style.pointerEvents = "none";
    fire.style.animation = "fireFloat 1.4s ease-out forwards";
    document.body.appendChild(fire);
    setTimeout(() => fire.remove(), 1400);
  }
}

/*************************************************
 * 💔 STREAK BROKEN WARNING
 *************************************************/
if (streakBroken) {
  const msg = document.createElement("div");
  msg.innerText = "💔 Uh oh! Streak reset!";
  msg.style.position = "fixed";
  msg.style.top = "30%";
  msg.style.left = "50%";
  msg.style.transform = "translate(-50%, -50%)";
  msg.style.fontSize = "26px";
  msg.style.fontWeight = "bold";
  msg.style.color = "#ff4d6d";
  msg.style.animation = "shake 0.6s";
  msg.style.zIndex = "999";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 1500);
}

/*************************************************
 * 🔒 VALENTINE WEEK UNLOCK SYSTEM (IST)
 *************************************************/
const schedule = [
  { day: "rose", date: 7 },
  { day: "propose", date: 8 },
  { day: "chocolate", date: 9 },
  { day: "teddy", date: 10 },
  { day: "promise", date: 11 },
  { day: "hug", date: 12 },
  { day: "kiss", date: 13 },
  { day: "valentine", date: 14 }
];

document.querySelectorAll("a").forEach(link => {
  const href = link.getAttribute("href");
  if (!href || !href.endsWith(".html")) return;

  const page = href.replace(".html", "");
  const entry = schedule.find(s => s.day === page);
  if (!entry) return;

  if (month !== 1 || todayDate < entry.date) {
    link.addEventListener("click", e => {
      e.preventDefault();
      alert("⏳ Not unlocked yet! Come back on the right day 💖");
    });
    link.style.opacity = "0.4";
  }
});

/*************************************************
 * 💖 FLOATING HEARTS (PERFORMANCE SAFE)
 *************************************************/
setInterval(() => {
  const heart = document.createElement("div");
  heart.innerText = "💖";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.fontSize = "18px";
  heart.style.opacity = "0.7";
  heart.style.pointerEvents = "none";
  heart.style.animation = "heartFloat 6s linear";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 2500);

/*************************************************
 * 🌸 PETAL FALL (LIMITED, NO OVERHEAT)
 *************************************************/
const petals = ["🌸", "🌹"];
let petalCount = 0;
const MAX_PETALS = 12;

setInterval(() => {
  if (petalCount >= MAX_PETALS) return;

  const p = document.createElement("div");
  p.innerText = petals[Math.floor(Math.random() * petals.length)];
  p.style.position = "fixed";
  p.style.left = Math.random() * 100 + "vw";
  p.style.top = "-10vh";
  p.style.fontSize = "20px";
  p.style.opacity = "0.8";
  p.style.pointerEvents = "none";
  p.style.animation = "petalFall 8s linear";

  document.body.appendChild(p);
  petalCount++;

  setTimeout(() => {
    p.remove();
    petalCount--;
  }, 8000);
}, 1800);

/*************************************************
 * ✨ BUTTON RIPPLE EFFECT
 *************************************************/
document.addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;

  const btn = e.target;
  const ripple = document.createElement("span");
  const rect = btn.getBoundingClientRect();

  ripple.style.position = "absolute";
  ripple.style.left = e.clientX - rect.left + "px";
  ripple.style.top = e.clientY - rect.top + "px";
  ripple.style.width = ripple.style.height =
    Math.max(rect.width, rect.height) + "px";
  ripple.style.background = "rgba(255,255,255,0.4)";
  ripple.style.borderRadius = "50%";
  ripple.style.transform = "scale(0)";
  ripple.style.animation = "ripple 600ms ease-out";
  ripple.style.pointerEvents = "none";

  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});
