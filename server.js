const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/* ===================== API ===================== */

// Login API sécurisé
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.json({ success: true, user: data.user });
});

// Vérifier session
app.get("/api/session", async (req, res) => {
  const { data } = await supabase.auth.getSession();
  res.json(data);
});

/* ===================== FRONTEND ===================== */

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`LuminasOS running on port ${PORT}`);
});
