// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// Configuration CORS
const corsOptions = {
  origin: "https://enzo-turpin.fr", // Autorise uniquement votre domaine
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Middleware pour servir les fichiers statiques (comme index.html)
app.use(express.static("public"));

// Route de base pour tester si le serveur fonctionne
app.get("/", (req, res) => {
  res.send("Le serveur fonctionne correctement !");
});

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route pour gérer l'envoi du formulaire de contact
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Nouveau message de ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      res.status(500).send("Erreur lors de l'envoi de l'email.");
    } else {
      console.log("Email envoyé:", info.response);
      res.status(200).send("Votre message a été envoyé avec succès !");
    }
  });
});

// Démarre le serveur sur le port spécifié
app.listen(port, "0.0.0.0", () => {
  console.log(`Serveur démarré sur http://0.0.0.0:${port}`);
});
