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
const quizData = require("../src/database/quizData.json");

// Endpoint zum Abrufen eines bestimmten Quiz
router.get("/:quizId", (req, res, next) => {
  const quizId = req.params.quizId;
  const quiz = quizData.find((quiz) => quiz.id === parseInt(quizId));

  if (quiz) {
    res.json(quiz);
  } else {
    const error = new Error("Quiz nicht gefunden");
    error.status = 404;
    next(error);
  }
});

// Endpoint zum Abrufen der Quizdaten
router.get("/", (req, res) => {
  res.json(quizData);
});

module.exports = router;
