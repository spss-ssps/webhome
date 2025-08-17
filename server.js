// server.js
// ----------------------------
// This is your Node.js server
// ----------------------------

const express = require("express"); // web framework
const path = require("path");       // helps with file paths

const app = express();
const PORT = process.env.PORT || 3000;

// This makes sure we can read JSON data from the frontend
app.use(express.json());

// This serves files from the "public" folder (like index.html)
app.use(express.static(path.join(__dirname, "public")));

// Simple "in-memory database" (data disappears if server restarts)
let zodiacSigns = [];

// Route to add a new sign
app.post("/api/add-sign", (req, res) => {
    const sign = req.body.sign; // get sign from the frontend
    if (!sign) {
        return res.status(400).json({ error: "You must provide a sign!" });
    }
    zodiacSigns.push(sign);
    res.json({ success: true });
});

// Route to get all signs
app.get("/api/signs", (req, res) => {
    res.json(zodiacSigns);
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
