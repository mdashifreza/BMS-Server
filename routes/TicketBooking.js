const express = require("express");
const TicketBooking = express.Router();
const { connection } = require("../db/connector");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middlewares/fetchUser");

TicketBooking.get("/api/booking", fetchUser, async (req, res) => {
  try {
    let result = await connection.find({user: req.user.id}).sort({ _id: -1 }).limit(1);

    // If no Last booking record found in database
    if (!result) {
      return res.json({ message: "No Previous Booking Found" });
    }
    // Sending the response
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

TicketBooking.post(
  "/api/booking",
  fetchUser,
  [
    body("movie", "Movie name is required").notEmpty(),
    body("slot", "time is required").notEmpty(),
    body("seats", "seat is required").notEmpty(),
  ],
  async (req, res) => {
    try {
      const body = req.body;

      // If there are errors, return Bad requests and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const bookmovietickets = new connection({
        movie: body.movie,
        slot: body.slot,
        seats: body.seats,
        user: req.user.id,
      });
      const savedTicket = await bookmovietickets.save();
      res.json(savedTicket);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = TicketBooking;
