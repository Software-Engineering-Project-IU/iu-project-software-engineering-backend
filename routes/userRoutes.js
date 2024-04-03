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
const userData = require("../src/database/userData.json");

// Endpoint zum Abrufen eines bestimmten Benutzers
router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const user = userData.find((user) => user.id === parseInt(userId));

  if (user) {
    res.json(user);
  } else {
    const error = new Error("Benutzer nicht gefunden");
    error.status = 404;
    next(error);
  }
});

// Endpoint zum Abrufen der Benutzerdaten
router.get("/", (req, res) => {
  res.json(userData);
});

module.exports = router;
