const db = require('../configurations/db');

const Book = {
  createBook: ({
    bookName,
    author,
    publishedYear,
    description,
    status,
    image,
  }) => {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO book (bookName, author, publishedYear, description, status, image) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(
        query,
        [bookName, author, publishedYear, description, status, image],
        (err, results) => {
          if (err) {
            return reject(err);
          }

          return resolve(results);
        }
      );
    });
  },
  getBookById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM book WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results[0]);
      });
    });
  },
  getAllBooks: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM book`;
      db.query(query, null, (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM book WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
  updateBook: (status, id) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE book SET status = ? WHERE id = ?';
      db.query(query, [status, id], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
  getAllBooksByStudent: (studentId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT book.id as id, bookName, author, publishedYear, description, book.status as status, image  FROM book, booking, book_booking, user WHERE user.id = booking.user_id AND booking.id = book_booking.booking_id AND book_booking.book_id = book.id AND user.id = ${studentId};`;
      db.query(query, null, (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
};

module.exports = Book;
