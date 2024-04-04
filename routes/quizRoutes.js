/*
 *	quizRoutes.js
 *
 *	Ersteller:		    Kevin Krazius
 *	Erstellungsdatum:	04-03-2024
 *	Info/Notizen:		  Auslagerung aller Quiz-Anfragen an die API
 *
 *	Editiert von:     Kevin Krazius
 *	Editiert am:      04-04-2024
 *	Info/Notizen:     Anfragen für spezifische Fragen und Antworten implementiert
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

// GET-Anfrage zum Abrufen aller Fragen
router.get("/questions", (req, res, next) => {
  req.db.query("SELECT * FROM questions", (error, results, fields) => {
    if (error) {
      return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
    }
    res.json(results); // Ergebnis als JSON zurückgeben
  });
});

// Get-Anfrage zum Abrufen aller Infos zu spezifischer Frage
router.get("/questions/:id", (req, res, next) => {
  const id = req.params.id;
  req.db.query(
    "SELECT * FROM questions WHERE id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
      }
      res.json(results); // Ergebnis als JSON zurückgeben
    }
  );
});

// Get-Anfrage zum Abrufen aller Infos zu spezifischer Antwort
router.get("/answers/:id", (req, res, next) => {
  const id = req.params.id;
  req.db.query(
    "SELECT * FROM answers WHERE question_id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
      }
      res.json(results); // Ergebnis als JSON zurückgeben
    }
  );
});

module.exports = router;
