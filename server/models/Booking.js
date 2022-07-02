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
};

module.exports = Booking;
