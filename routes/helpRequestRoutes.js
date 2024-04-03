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

// Endpoint zum Abrufen von Hilfsanfragen
router.get("/", (req, res) => {
  const helpRequests = quizData.filter((request) => request.isHelpNeeded);
  res.json(helpRequests);
});

module.exports = router;
