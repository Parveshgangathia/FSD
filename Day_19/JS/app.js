// Element references
const form = document.getElementById("signupForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm");
const submitBtn = document.getElementById("submitBtn");

const fullnameError = document.getElementById("fullnameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const formMsg = document.getElementById("formMsg");

// Regex rules
const emailRegex = /\S+@\S+\.\S+/;
const uppercase = /[A-Z]/;
const number = /[0-9]/;
const special = /[!@#\$%\^&\*\(\)_\+\-=\{\}\[\]:";'<>?,.\/\\|`~]/;

// Helper animation for errors
function showError(el, msg) {
  if (!msg) {
    if (!el.classList.contains("hidden")) {
      el.classList.add("msg-leave");
      requestAnimationFrame(() => {
        el.classList.add("msg-leave-to");
        el.addEventListener("transitionend", function finish() {
          el.classList.add("hidden");
          el.classList.remove("msg-leave", "msg-leave-to");
          el.removeEventListener("transitionend", finish);
        });
      });
    }
    el.textContent = "";
    return;
  }

  el.textContent = msg;
  if (el.classList.contains("hidden")) {
    el.classList.remove("hidden");
    el.classList.add("msg-enter");
    requestAnimationFrame(() => {
      el.classList.add("msg-enter-to");
      el.addEventListener("transitionend", function clean() {
        el.classList.remove("msg-enter", "msg-enter-to");
        el.removeEventListener("transitionend", clean);
      });
    });
  }
}

// Validation functions
function validateFullname() {
  const v = fullname.value.trim();
  if (v.length < 3) return { ok: false, msg: "Name must be at least 3 characters." };
  if (/\d/.test(v)) return { ok: false, msg: "Name cannot contain numbers." };
  return { ok: true, msg: "" };
}

function validateEmail() {
  const v = email.value.trim();
  if (!emailRegex.test(v)) return { ok: false, msg: "Enter a valid email." };
  return { ok: true, msg: "" };
}

function validatePassword() {
  const v = password.value;
  if (v.length < 8) return { ok: false, msg: "Minimum 8 characters." };
  if (!uppercase.test(v)) return { ok: false, msg: "At least one uppercase." };
  if (!number.test(v)) return { ok: false, msg: "At least one number." };
  if (!special.test(v)) return { ok: false, msg: "At least one special character." };
  return { ok: true, msg: "" };
}

function validateConfirm() {
  if (confirmPass.value !== password.value) {
    return { ok: false, msg: "Passwords do not match." };
  }
  return { ok: true, msg: "" };
}

// Validate entire form + toggle button
function validateForm() {
  const f = validateFullname();
  const e = validateEmail();
  const p = validatePassword();
  const c = validateConfirm();

  showError(fullnameError, f.msg);
  showError(emailError, e.msg);
  showError(passwordError, p.msg);
  showError(confirmError, c.msg);

  const allOk = f.ok && e.ok && p.ok && c.ok;

  submitBtn.disabled = !allOk;
  submitBtn.classList.toggle("opacity-50", !allOk);
  submitBtn.classList.toggle("cursor-not-allowed", !allOk);

  return allOk;
}

// Real-time validation listeners
[fullname, email, password, confirmPass].forEach(input => {
  input.addEventListener("input", validateForm);
  input.addEventListener("blur", validateForm);
});

// Submit handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  // Simulate success
  formMsg.textContent = "Account created successfully!";
  formMsg.classList.remove("hidden");

  submitBtn.disabled = true;

  setTimeout(() => {
    form.reset();
    formMsg.classList.add("hidden");
    validateForm();
  }, 1500);
});

// initialize
validateForm();
