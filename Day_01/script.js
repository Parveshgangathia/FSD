
const message = document.getElementById("message");


const btn = document.getElementById("changeTextBtn");

// event
btn.addEventListener("click", function () {
    message.innerText = "You clicked the button! JavaScript is working 🎉";
});
