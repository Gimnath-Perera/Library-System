const db = require('../configurations/db');

const Book = {
  createBook: ({
    bookName,
    author,
    publishedYear,
    numberOfBooks,
    description,
    status,
    image,
  }) => {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO book (bookName, author, publishedYear, description, status, image) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(
        query,
        [
          bookName,
          author,
          publishedYear,
          numberOfBooks,
          description,
          status,
          image,
        ],
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
};

module.exports = Book;
