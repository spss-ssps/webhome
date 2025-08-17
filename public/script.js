// script.js
// -----------------------------
// Handles talking to the server
// -----------------------------

const form = document.getElementById("zodiac-form");
const input = document.getElementById("sign");
const list = document.getElementById("sign-list");

// When the form is submitted
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // stop page reload

    const sign = input.value.trim();
    if (!sign) return;

    // Send sign to the server
    await fetch("/api/add-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sign })
    });

    input.value = ""; // clear input
    loadSigns(); // refresh list
});

// Load all signs from the server
async function loadSigns() {
    const res = await fetch("/api/signs");
    const signs = await res.json();

    list.innerHTML = ""; // clear list
    signs.forEach((sign) => {
        const li = document.createElement("li");
        li.textContent = sign;
        list.appendChild(li);
    });
}

// Load signs when page starts
loadSigns();
