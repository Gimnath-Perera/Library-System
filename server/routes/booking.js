const { validationResult } = require('express-validator');
require('dotenv').config();

const response = require('../configurations/response');
const Booking = require('../models/Booking');
const Book = require('../models/Book');

const BookingRoute = {
  createBooking: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }
      const { student, book } = req.body;

      const newBooking = {
        student,
        status: 'Issued',
      };
      //create a record in `booking`
      const booking = await Booking.createBooking(newBooking);

      //create a record in `book_booking`
      const bookingBook = await Booking.recordInBookBookings({
        booking: booking.insertId,
        book,
      });

      //update book status in `book`
      const updateBook = await Book.updateBook('Issued', book);

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
