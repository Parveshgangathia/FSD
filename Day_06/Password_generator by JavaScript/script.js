// script.js — Password Generator (Day_06)
// Uses only vanilla JS. Drop this file in the same folder and ensure it's loaded with `defer`.

(function () {
  // --- Element refs ---
  const lengthInput = document.getElementById("length");
  const chkLower = document.getElementById("lowercase");
  const chkUpper = document.getElementById("uppercase");
  const chkNumbers = document.getElementById("numbers");
  const chkSymbols = document.getElementById("symbols");

  const generateBtn = document.getElementById("generateBtn");
  const regenBtn = document.getElementById("regenBtn");
  const passwordDisplay = document.getElementById("passwordDisplay");
  const copyBtn = document.getElementById("copyBtn");
  const eyeBtn = document.getElementById("eyeBtn");

  const message = document.getElementById("message");
  const strengthMeter = document.getElementById("strengthMeter");

  // --- Character sets ---
  const CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
  const CHAR_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const CHAR_NUMS = "0123456789";
  const CHAR_SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

  // --- Config ---
  const MIN_LENGTH = 4;
  const MAX_LENGTH = 64;
  const MSG_SHOW_MS = 1500;
  const ANIM_MS = 180;

  // --- Helpers ---
  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function shuffleArray(arr) {
    // Fisher-Yates
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pickRandom(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
  }

  function buildPoolAndGuarantees(selectedSets) {
    let pool = "";
    const guarantees = [];
    if (selectedSets.lower) {
      pool += CHAR_LOWER;
      guarantees.push(pickRandom(CHAR_LOWER));
    }
    if (selectedSets.upper) {
      pool += CHAR_UPPER;
      guarantees.push(pickRandom(CHAR_UPPER));
    }
    if (selectedSets.nums) {
      pool += CHAR_NUMS;
      guarantees.push(pickRandom(CHAR_NUMS));
    }
    if (selectedSets.symbols) {
      pool += CHAR_SYMBOLS;
      guarantees.push(pickRandom(CHAR_SYMBOLS));
    }
    return { pool, guarantees };
  }

  function getSelectedSets() {
    return {
      lower: chkLower.checked,
      upper: chkUpper.checked,
      nums: chkNumbers.checked,
      symbols: chkSymbols.checked,
    };
  }

  // --- Validation ---
  function validateInputs() {
    const length = parseInt(lengthInput.value, 10) || 0;
    if (Number.isNaN(length) || length < MIN_LENGTH || length > MAX_LENGTH) {
      showMessage(
        `Length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        true
      );
      return false;
    }

    const sets = getSelectedSets();
    if (!sets.lower && !sets.upper && !sets.nums && !sets.symbols) {
      showMessage("Select at least one character type", true);
      return false;
    }

    clearMessage();
    return true;
  }

  // --- UI messages & small toast ---
  let msgTimeout = null;
  function showMessage(text, isError = false) {
    if (msgTimeout) {
      clearTimeout(msgTimeout);
      msgTimeout = null;
    }
    message.textContent = text;
    message.style.color = isError ? "#fb7185" : "#22c55e";
    message.classList.add("show");

    msgTimeout = setTimeout(() => {
      message.classList.remove("show");
      msgTimeout = null;
    }, MSG_SHOW_MS);
  }

  function clearMessage() {
    if (msgTimeout) {
      clearTimeout(msgTimeout);
      msgTimeout = null;
    }
    message.classList.remove("show");
    message.textContent = "";
  }

  // --- Strength meter (very simple heuristic) ---
  function updateStrengthMeter(pwd) {
    // score 0..4: length and variety
    let score = 0;
    if (!pwd) {
      strengthMeter.value = 0;
      return;
    }
    // length thresholds
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    // variety
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNum = /[0-9]/.test(pwd);
    const hasSym = /[!@#$%^&*()_+\-=[\]{}|;:,.<>?/]/.test(pwd);

    const variety = [hasLower, hasUpper, hasNum, hasSym].filter(Boolean).length;
    if (variety >= 2) score++;
    if (variety >= 3) score++;

    strengthMeter.value = clamp(score, 0, 4);
  }

  // --- Animation helper for display box ---
  function animatePasswordChange(newPwd) {
    // apply quick fade-out -> update -> fade-in
    const el = passwordDisplay;
    // set up inline transition if not present
    if (!el.style.transition) {
      el.style.transition = `opacity ${ANIM_MS}ms ease, transform ${ANIM_MS}ms ease`;
    }
    el.style.opacity = "0";
    el.style.transform = "scale(0.99)";

    setTimeout(() => {
      el.value = newPwd;
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
      // update strength after visible
      updateStrengthMeter(newPwd);
      // announce to screen-readers
      el.setAttribute("aria-label", `Generated password ${newPwd}`);
    }, ANIM_MS);
  }

  // --- Core generator ---
  function generatePassword() {
    // validation
    const lengthRaw = parseInt(lengthInput.value, 10);
    const length = clamp(
      Number.isFinite(lengthRaw) ? lengthRaw : 0,
      MIN_LENGTH,
      MAX_LENGTH
    );

    const sets = getSelectedSets();
    if (!sets.lower && !sets.upper && !sets.nums && !sets.symbols) {
      showMessage("Select at least one character type", true);
      return "";
    }

    const { pool, guarantees } = buildPoolAndGuarantees(sets);
    if (!pool) {
      showMessage("No character pool available", true);
      return "";
    }

    // If requested length is less than number of guarantees, shrink guarantees (edge-case)
    const guaranteed = guarantees.slice(0, length);

    // fill rest
    const restCount = length - guaranteed.length;
    const pwdArr = guaranteed.slice(); // copy guaranteed
    for (let i = 0; i < restCount; i++) {
      pwdArr.push(pickRandom(pool));
    }

    // shuffle final chars
    shuffleArray(pwdArr);

    return pwdArr.join("");
  }

  // --- Copy to clipboard with fallback ---
  async function copyToClipboard(text) {
    if (!text) {
      showMessage("Nothing to copy", true);
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        // prevent page jump
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showMessage("Copied!", false);
    } catch (err) {
      showMessage("Copy failed", true);
    }
  }

  // --- Toggle show/hide password ---
  let isVisible = false;
  function toggleVisibility() {
    isVisible = !isVisible;
    passwordDisplay.type = isVisible ? "text" : "text"; // kept as text per starter (readonly input)
    // We can change eyeBtn text
    eyeBtn.textContent = isVisible ? "Hide" : "Show";
  }

  // --- Wiring events ---
  generateBtn.addEventListener("click", () => {
    if (!validateInputs()) return;
    const pwd = generatePassword();
    animatePasswordChange(pwd);
    // small success message
    showMessage("Password generated");
  });

  regenBtn.addEventListener("click", () => {
    // regen uses same validation & settings
    if (!validateInputs()) return;
    const pwd = generatePassword();
    animatePasswordChange(pwd);
    showMessage("Password regenerated");
  });

  copyBtn.addEventListener("click", async () => {
    const text = passwordDisplay.value;
    await copyToClipboard(text);
  });

  eyeBtn.addEventListener("click", () => {
    toggleVisibility();
  });

  // Validate while typing and toggle generate button state
  function toggleGenerateState() {
    const lengthOk = (() => {
      const lv = parseInt(lengthInput.value, 10);
      return !Number.isNaN(lv) && lv >= MIN_LENGTH && lv <= MAX_LENGTH;
    })();
    const sets = getSelectedSets();
    const anySet = sets.lower || sets.upper || sets.nums || sets.symbols;
    generateBtn.disabled = !(lengthOk && anySet);
  }

  // wire change events
  [lengthInput, chkLower, chkUpper, chkNumbers, chkSymbols].forEach((el) => {
    el.addEventListener("input", toggleGenerateState);
    el.addEventListener("change", toggleGenerateState);
  });

  // init
  toggleGenerateState();
  passwordDisplay.value = "";
  strengthMeter.value = 0;

  // Accessibility: generate on Enter when focused on length input
  lengthInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      generateBtn.click();
    }
  });
})();
