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

// PUT-Anfrage zum Aktualisieren einer Frage
router.put("/update-questions/:id", (req, res, next) => {
  const id = req.params.id;
  const { question_text, module_name } = req.body;

  req.db.query(
    "UPDATE questions SET question_text = ?, module_name = ? WHERE id = ?",
    [question_text, module_name, id],
    (error, results, fields) => {
      if (error) {
        return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
      }
      res.sendStatus(204); // Erfolgsstatus zurückgeben
    }
  );
});

// PUT-Anfrage zum Aktualisieren einer Antwort
router.put("/update-answers/:id", (req, res, next) => {
  const id = req.params.id;
  const { answer_text, is_correct } = req.body;

  req.db.query(
    "UPDATE answers SET answer_text = ?, is_correct = ? WHERE id = ?",
    [answer_text, is_correct, id],
    (error, results, fields) => {
      if (error) {
        return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
      }
      res.sendStatus(204); // Erfolgsstatus zurückgeben
    }
  );
});

// PUT-Anfrage zum aktualisieren einer Frage bezüglich is_help_needed
router.put("/help-needed/:id", (req, res, next) => {
  const id = req.params.id;
  const { is_help_needed, user_needing_help } = req.body;
  req.db.query(
    "UPDATE questions SET is_help_needed = ?, user_needing_help = ? WHERE id = ?",
    [is_help_needed, user_needing_help, id],
    (error, results, fields) => {
      if (error) {
        return next(error);
      }
      res.sendStatus(204);
    }
  );
});

// PUT-Anfrage zum aktualisieren einer Frage bezüglich is_help_needed
router.put("/delete-help-needed/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("diese ID", id);
  req.db.query(
    "UPDATE questions SET is_help_needed = 0 WHERE id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        return next(error);
      }
      res.sendStatus(204);
    }
  );
});

// POST-Anfrage zum Erstellen einer neuen Frage und Antworten
router.post("/create-question", (req, res, next) => {
  const { question_text, module_name, answers } = req.body;
  const is_help_needed = false;
  // Zuerst die Frage in die Datenbank einfügen
  req.db.query(
    "INSERT INTO questions (question_text, module_name, is_help_needed) VALUES (?, ?, ?)",
    [question_text, module_name, is_help_needed],
    (error, questionResults, fields) => {
      if (error) {
        return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
      }

      const questionId = questionResults.insertId;

      // Dann die Antworten in die Datenbank einfügen, indem Sie eine Schleife verwenden, um alle Antworten zu verarbeiten
      const answerValues = answers.map(({ text, isCorrect }) => [
        text,
        isCorrect,
        questionId, // Verweisen auf die ID der neu erstellten Frage
      ]);

      req.db.query(
        "INSERT INTO answers (answer_text, is_correct, question_id) VALUES ?",
        [answerValues],
        (error, answerResults, fields) => {
          if (error) {
            return next(error); // Fehler an die zentrale Fehlerbehandlung weiterleiten
          }
          res.sendStatus(201); // Erfolgsstatus für die neu erstellte Frage zurückgeben
        }
      );
    }
  );
});

module.exports = router;
