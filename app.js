/*
 *	app.js
 *
 *	Ersteller:		    Kevin Krazius
 *	Erstellungsdatum:	03-29-2024
 *	Info/Notizen:		  Express-App, definiert das Backend
 *
 *	Editiert von:
 *	Editiert am:
 *	Info/Notizen:
 *
 */

const userData = require("./src/database/userData.json");
const quizData = require("./src/database/quizData.json");

const express = require("express");
const app = express();
const port = 3000;

// Endpoint zum Abrufen der Benutzerdaten
app.get("/users", (req, res) => {
  res.json(userData);
});

// Endpoint zum Abrufen der Quizdaten
app.get("/quiz", (req, res) => {
  res.json(quizData);
});

// Starten des Servers
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
