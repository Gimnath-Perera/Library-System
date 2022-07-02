const { validationResult } = require('express-validator');
require('dotenv').config();

const response = require('../configurations/response');
const Booking = require('../models/Booking');

const BookingRoute = {
  createBooking: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }
      const { status, student, book } = req.body;

      const newBooking = {
        student,
        status,
      };

      const booking = await Booking.createBooking(newBooking);
      const bookingBook = await Booking.recordInBookBookings({
        booking: booking.insertId,
        book,
      });

      return response.success(
        req,
        res,
        {
          booking: bookingBook,
        },
        'Book created successfully'
      );
    } catch (err) {
      return response.fail(
        req,
        res,
        response.messages.server_error,
        err.message
      );
    }
  },
};

module.exports = BookingRoute;
