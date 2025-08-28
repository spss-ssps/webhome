// script.js
// -----------------------------
// Handles communication with the server
// -----------------------------

const form = document.getElementById("zodiac-form");
const select = document.getElementById("sign");  // Changed from input to select
const list = document.getElementById("sign-list");

// Submit a new sign
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // stop page reload

    const sign = select.value;  // Get selected value from dropdown
    if (!sign) return;

    await fetch("/api/add-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sign })
    });

    select.value = ""; // clear selection
    loadSigns(); // refresh list
});

// Load all signs from server
async function loadSigns() {
    const res = await fetch("/api/signs");
    const signs = await res.json();

    list.innerHTML = "";
    signs.forEach((sign) => {
        const div = document.createElement("div");
        div.textContent = sign;
        list.appendChild(div);
    });
}

// Load signs on page load
loadSigns();
