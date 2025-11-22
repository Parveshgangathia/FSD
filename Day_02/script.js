// Select the form
const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    // 1. Prevent default behavior
    event.preventDefault();

    // 2. Read all input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;
    const gender = document.querySelector("input[name='gender']:checked")?.value;
    const city = document.getElementById("city").value;

    // 3. Basic validation (empty name)
    if (name === "") {
        alert("Name cannot be empty!");
        return;
    }

    // 4. Alert message with template string
    alert(`Welcome, ${name}! Your form has been submitted.`);
});
