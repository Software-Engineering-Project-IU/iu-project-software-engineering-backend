/*
 *	app.js
 *
 *	Ersteller:		    Kevin Krazius
 *	Erstellungsdatum:	03-29-2024
 *	Info/Notizen:		  Express-App, definiert das Backend
 *
 *	Editiert von:     Kevin Krazius
 *	Editiert am:      04-03-2024
 *	Info/Notizen:     MySQL Installed and connected
 *
 */

const mysql = require("mysql");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());

// Verbindung zur Datenbank herstellen
const connection = mysql.createConnection({
  host: "database-1.cf8u260est2h.eu-central-1.rds.amazonaws.com", // Hostname Datenbank
  port: "3306", // Portname
  user: "admin", // Benutzername
  password: "iu-projekt", // Passwort
  database: "iu_test_database", // Name Datenbank
});

// Verbindung herstellen
connection.connect(function (err) {
  if (err) {
    console.error("Fehler beim Verbinden zur Datenbank: " + err.stack);
    return;
  }

  console.log(
    "Verbindung zur Datenbank hergestellt mit der ID " + connection.threadId
  );
});

// Beispielabfrage ausführen
connection.query("SELECT * FROM questions", (error, results, fields) => {
  if (error) {
    console.error("Fehler bei der Abfrage:", error);
    return;
  }
  console.log("Abfrageergebnis:", results);
});

// Verbindung schließen, wenn die App beendet wird
process.on("SIGINT", () => {
  connection.end();
  console.log("Verbindung zur Datenbank geschlossen");
});

// Endpoint zum Abrufen eines bestimmten Benutzers
app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId; // Benutzer-ID aus der URL-Parameter erhalten
  const user = userData[userId - 1]; // Benutzer aus den Daten abrufen (Index beginnt bei 0)

  if (user) {
    res.json(user); // Wenn Benutzer gefunden wurde, sende ihn als JSON zurück
  } else {
    res.status(404).json({ message: "Benutzer nicht gefunden" }); // Wenn Benutzer nicht gefunden wurde, sende Fehlermeldung zurück
  }
});

// Endpoint zum Abrufen eines bestimmten Quiz
app.get("/quiz/:quizId", (req, res) => {
  const quizId = req.params.quizId; // Quiz-ID aus der URL-Parameter erhalten
  const quiz = quizData[quizId - 1]; // Quiz aus den Daten abrufen (Index beginnt bei 0)

  if (quiz) {
    res.json(quiz); // Wenn Quiz gefunden wurde, sende es als JSON zurück
  } else {
    res.status(404).json({ message: "Quiz nicht gefunden" }); // Wenn Quiz nicht gefunden wurde, sende Fehlermeldung zurück
  }
});

// Endpoint zum Abrufen der Benutzerdaten
app.get("/users", (req, res) => {
  res.json(userData);
});

// Endpoint zum Abrufen der Quizdaten
app.get("/quizdata", (req, res) => {
  res.json(quizData);
});

app.get("/helpRequests", (req, res) => {
  // Filtere die Hilfsanfragen, für die "isHelpNeeded" true ist
  const helpRequests = quizData.filter((request) => request.isHelpNeeded);

  // Sende die gefilterten Hilfsanfragen als JSON zurück
  res.json(helpRequests);
});

// Starten des Servers
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
