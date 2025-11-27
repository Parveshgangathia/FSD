// Array of 18 quotes (mix of inspirational and thoughtful) each as {text, author}
const quotes = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Do one thing every day that scares you.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "Small steps every day.", author: "Unknown" },
  {
    text: "If you're going through hell, keep going.",
    author: "Winston Churchill",
  },
  { text: "Progress, not perfection.", author: "Unknown" },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "Failure is the condiment that gives success its flavor.",
    author: "Truman Capote",
  },
  {
    text: "Action is the foundational key to all success.",
    author: "Pablo Picasso",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  { text: "Little by little, a little becomes a lot.", author: "Unknown" },
  { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  {
    text: "Be stubborn about your goals, flexible about your methods.",
    author: "Unknown",
  },
];

// DOM refs
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newBtn = document.getElementById("newBtn");
const copyBtn = document.getElementById("copyBtn");

let lastIndex = -1;
let animDuration = 350; // same as CSS transition

function pickRandomIndex() {
  if (quotes.length === 1) return 0;
  let i = Math.floor(Math.random() * quotes.length);
  // avoid repeating the same quote twice
  while (i === lastIndex) {
    i = Math.floor(Math.random() * quotes.length);
  }
  lastIndex = i;
  return i;
}

function displayQuote(idx) {
  const q = quotes[idx];
  quoteText.textContent = q.text;
  quoteAuthor.textContent = q.author ? `— ${q.author}` : "";
}

// Swap with fade animation
function showNewQuote() {
  // disable button to avoid spam during animation
  newBtn.disabled = true;
  quoteText.classList.add("is-fade");
  quoteAuthor.classList.add("is-fade");

  setTimeout(() => {
    const idx = pickRandomIndex();
    displayQuote(idx);

    // fade in
    // Force reflow to ensure transition restarts (safe trick)
    void quoteText.offsetWidth;
    quoteText.classList.remove("is-fade");
    quoteAuthor.classList.remove("is-fade");

    // Re-enable button after animation ends
    setTimeout(() => {
      newBtn.disabled = false;
    }, animDuration);
  }, animDuration);
}

// Initial seed quote
displayQuote(pickRandomIndex());

// Event listeners
newBtn.addEventListener("click", showNewQuote);

// Copy current quote to clipboard
copyBtn.addEventListener("click", async () => {
  const txt = `${quoteText.textContent} ${quoteAuthor.textContent}`.trim();
  try {
    await navigator.clipboard.writeText(txt);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  } catch (err) {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  }
});

// Keyboard: space triggers new quote (nice for quick demos)
window.addEventListener("keydown", (e) => {
  if (
    e.code === "Space" &&
    document.activeElement.tagName !== "BUTTON" &&
    document.activeElement.tagName !== "INPUT"
  ) {
    e.preventDefault();
    if (!newBtn.disabled) showNewQuote();
  }
});
