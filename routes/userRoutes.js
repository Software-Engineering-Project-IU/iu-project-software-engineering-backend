/*
 *	userRoutes.js
 *
 *	Ersteller:		    Kevin Krazius
 *	Erstellungsdatum:	04-03-2024
 *	Info/Notizen:		Auslagerung aller User-Anfragen an die API
 *
 *	Editiert von:
 *	Editiert am:
 *	Info/Notizen:
 *
 */

const express = require("express");
const router = express.Router();

// GET-Anfrage zum Abrufen aller Benutzer
router.get("/", (req, res, next) => {
  req.db.query("SELECT * FROM users", (error, results, fields) => {
    if (error) {
      return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
    }
    res.json(results); // Ergebnis als JSON zurückgeben
  });
});

// Endpoint zum Abrufen eines bestimmten Benutzers
router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId; // Benutzer-ID aus den URL-Parametern erhalten
  req.db.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (error, results, fields) => {
      if (error) {
        return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
      }
      res.json(results); // Ergebnis als JSON zurückgeben
    }
  );
});

module.exports = router;
