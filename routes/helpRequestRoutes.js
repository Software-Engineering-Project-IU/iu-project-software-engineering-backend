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

// POST-Anfrage zum Aktualisieren des Status von is_helpful
router.post("/:id/helpful", (req, res, next) => {
  const requestId = req.params.id;
  req.db.query(
    "UPDATE help_requests SET is_helpful = true WHERE id = ?",
    [requestId],
    (error, results, fields) => {
      if (error) {
        return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
      }
      res.sendStatus(204); // Erfolgsstatus zurückgeben
    }
  );
});

// POST-Anfrage zum Aktualisieren des Status von provided_help
router.post("/provide-help", (req, res, next) => {
  const { user_id, question_id, provided_help } = req.body;

  req.db.query(
    "INSERT INTO help_requests (user_id, question_id, provided_help) VALUES (?, ?, ?)",
    [user_id, question_id, provided_help],
    (error, questionResults, fields) => {
      if (error) {
        return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
      }
    }
  );
});

// DELETE-Anfrage zum Löschen einer Hilfsanfrage
router.delete("/:id/delete", (req, res, next) => {
  const requestId = req.params.id;
  req.db.query(
    "DELETE FROM help_requests WHERE id = ?",
    [requestId],
    (error, results, fields) => {
      if (error) {
        return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
      }
      res.sendStatus(204); // Erfolgsstatus zurückgeben
    }
  );
});

module.exports = router;
