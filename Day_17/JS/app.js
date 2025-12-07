// Elements
const targetInput = document.getElementById("targetInput");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusEl = document.getElementById("status");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const displayText = document.getElementById("displayText");
const percentLabel = document.getElementById("percentLabel");
const progressCircle = document.getElementById("progressCircle");
const targetPreview = document.getElementById("targetPreview");

// Progress circle math
const R = 48;
const CIRC = 2 * Math.PI * R;
progressCircle.style.strokeDasharray = `${CIRC}`;
progressCircle.style.strokeDashoffset = `${CIRC}`;

// State
let intervalId = null;
let targetDate = null;
let startDate = null;
let totalMs = null;
let ended = false;

// Helper
const two = (n) => String(n).padStart(2, "0");

// Beep sound
function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = 900;
    g.gain.value = 0.001;
    o.connect(g);
    g.connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(0.3, now + 0.02);
    o.start(now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    o.stop(now + 1.25);
  } catch {}
}

// Start countdown
function startCountdown() {
  stopCountdown();

  const val = targetInput.value;
  if (!val) return showStatus("Please select a date.");

  const parsed = new Date(val);
  if (isNaN(parsed)) return showStatus("Invalid date!");

  if (parsed <= new Date()) return showStatus("Date must be in the future.");

  targetDate = parsed;
  startDate = new Date();
  totalMs = targetDate - startDate;

  targetPreview.textContent = "Target: " + parsed.toLocaleString();
  displayText.textContent = "Counting down...";

  showStatus("", false);

  updateOnce();
  intervalId = setInterval(updateOnce, 1000);
}

// Stop countdown
function stopCountdown() {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
}

// Show status
function showStatus(msg, error = true) {
  if (!msg) {
    statusEl.classList.add("hidden");
    return;
  }
  statusEl.textContent = msg;
  statusEl.classList.remove("hidden");
  statusEl.classList.toggle("text-red-500", error);
}

// Update countdown every second
function updateOnce() {
  const now = new Date();
  let diff = targetDate - now;

  if (diff <= 0) {
    endCountdown();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 86400000;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 3600000;

  const minutes = Math.floor(diff / 60000);
  diff -= minutes * 60000;

  const seconds = Math.floor(diff / 1000);

  daysEl.textContent = two(days);
  hoursEl.textContent = two(hours);
  minutesEl.textContent = two(minutes);
  secondsEl.textContent = two(seconds);

  // update progress
  const remaining = targetDate - now;
  const percent = Math.max(0, Math.round((remaining / totalMs) * 100));
  updateProgress(percent);
}

// End of timer
function endCountdown() {
  stopCountdown();
  daysEl.textContent = "00";
  hoursEl.textContent = "00";
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";

  displayText.textContent = "Time's up!";
  displayText.classList.add("times-up");

  updateProgress(0);

  if (!ended) {
    playBeep();
    ended = true;
  }
}

// Update circular progress
function updateProgress(percent) {
  percentLabel.textContent = percent + "%";
  const offset = CIRC * (1 - percent / 100);
  progressCircle.style.strokeDashoffset = offset;

  if (percent < 10) {
    progressCircle.style.stroke = "#ef4444";
  } else {
    progressCircle.style.stroke = "url(#grad)";
  }
}

// Bind buttons
startBtn.addEventListener("click", startCountdown);
stopBtn.addEventListener("click", () => {
  stopCountdown();
  displayText.textContent = "Stopped";
  updateProgress(0);
});

// Auto-fill future time (1 min ahead)
(function preset() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 1);
  const pad = (n) => String(n).padStart(2, "0");
  targetInput.value =
    now.getFullYear() +
    "-" +
    pad(now.getMonth() + 1) +
    "-" +
    pad(now.getDate()) +
    "T" +
    pad(now.getHours()) +
    ":" +
    pad(now.getMinutes());
})();
