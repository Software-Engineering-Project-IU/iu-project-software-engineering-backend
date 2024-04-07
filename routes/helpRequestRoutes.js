/*
 *	HelpRequestRoutes.js
 *
 *	Ersteller:		    Kevin Krazius
 *	Erstellungsdatum:	04-03-2024
 *	Info/Notizen:		Auslagerung aller Hilfs-Anfragen an die API
 *
 *	Editiert von:
 *	Editiert am:
 *	Info/Notizen:
 *
 */

const express = require("express");
const router = express.Router();

// GET-Anfrage zum Abrufen aller Hilfsanfragen
router.get("/", (req, res, next) => {
  req.db.query("SELECT * FROM help_requests", (error, results, fields) => {
    if (error) {
      return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
    }
    res.json(results); // Ergebnis als JSON zurückgeben
  });
});

module.exports = router;
