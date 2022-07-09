const db = require('../configurations/db');

const Booking = {
  createBooking: ({ status, student }) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO booking (status, user_id) VALUES (?, ?)';
      db.query(query, [status, student], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
  recordInBookBookings: ({ booking, book }) => {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO book_booking (booking_id, book_id) VALUES (?, ?)';
      db.query(query, [booking, book], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
  getBookingByBookId: (bookId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM book_booking WHERE book_id = ?';
      db.query(query, [bookId], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
  returnBooking: (bookingId) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE booking SET status = ? WHERE id = ?';
      db.query(query, ['Returned', bookingId], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
};

module.exports = Booking;
