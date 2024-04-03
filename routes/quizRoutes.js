/*
 *	quizRoutes.js
 *
 *	Ersteller:		    Kevin Krazius
 *	Erstellungsdatum:	04-03-2024
 *	Info/Notizen:		Auslagerung aller Quiz-Anfragen an die API
 *
 *	Editiert von:
 *	Editiert am:
 *	Info/Notizen:
 *
 */

const express = require("express");
const router = express.Router();

// GET-Anfrage zum Abrufen aller Antworten
router.get("/answers", (req, res, next) => {
  req.db.query("SELECT * FROM answers", (error, results, fields) => {
    if (error) {
      return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
    }
    res.json(results); // Ergebnis als JSON zurückgeben
  });
});

// GET-Anfrage zum Abrufen aller Antworten
router.get("/questions", (req, res, next) => {
  req.db.query("SELECT * FROM questions", (error, results, fields) => {
    if (error) {
      return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
    }
    res.json(results); // Ergebnis als JSON zurückgeben
  });
});

module.exports = router;
