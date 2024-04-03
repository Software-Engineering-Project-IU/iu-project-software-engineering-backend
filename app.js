/*
 *	app.js
 *
 *	Ersteller:		    Kevin Krazius
 *	Erstellungsdatum:	03-29-2024
 *	Info/Notizen:		  Express-App, definiert das Backend
 *
 *	Editiert von:     Kevin Krazius
 *	Editiert am:      04-03-2024
 *	Info/Notizen:     MySQL Installed and connected - Auslagerung der einzelnen API-Anfragen
 *
 */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mysql = require("mysql");

const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const helpRequestRoutes = require("./routes/helpRequestRoutes");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
//app.use(morgan("dev")); // optional: für Anfrageprotokollierung

// Verbindung zur Datenbank herstellen
const connection = mysql.createConnection({
  host: "database-1.cf8u260est2h.eu-central-1.rds.amazonaws.com", // Hostname Datenbank
  port: "3306", // Portname
  user: "admin", // Benutzername
  password: "iu-projekt", // Passwort
  database: "iu_test_database", // Name Datenbank
});

// Middleware für Datenbankverbindung
app.use((req, res, next) => {
  req.db = connection;
  next();
});

// Routen
app.use("/users", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/helpRequests", helpRequestRoutes);

// Fehlerbehandlung für nicht gefundene Routen
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// Zentrale Fehlerbehandlung
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Starten des Servers
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
