// hidden_message.js
const btn = document.querySelector("#togglebtn");
const text = document.querySelector("#hiddentext");

// set initial button text to match hidden state
btn.innerText = "Show text";

btn.addEventListener("click", function () {
    // If computed style is none OR inline style is "none" treat as hidden.
    const isHidden = window.getComputedStyle(text).display === "none";

    if (isHidden) {
        text.style.display = "block";
        btn.innerText = "Hide text";
    } else {
        text.style.display = "none";
        btn.innerText = "Show text";
    }
});

