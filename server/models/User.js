const db = require('../configurations/db');

const User = {
  createUser: ({ fullName, email, password, address, type, status, level }) => {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO user (fullName, email, password, address, type, status, level) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(
        query,
        [fullName, email, password, address, type, status, level],
        (err, results) => {
          if (err) {
            return reject(err);
          }

          return resolve(results);
        }
      );
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM user WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results[0]);
      });
    });
  },
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM user WHERE email = ?';
      db.query(query, [email], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results[0]);
      });
    });
  },
  getAllStudents: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT *, "" as password FROM user WHERE type= 'student'`;
      db.query(query, null, (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
  deleteStudent: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM user WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
};

module.exports = User;
