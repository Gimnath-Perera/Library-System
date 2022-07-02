const { check } = require('express-validator');

exports.authenticate = [
  check('email', 'email is required').not().isEmpty(),
  check('password', 'password is required').not().isEmpty(),
];

exports.register = [
  check('fullName', 'fullName is required').not().isEmpty(),
  check('email', 'email is required').not().isEmpty(),
  check('password', 'password is required').not().isEmpty(),
  check('address', 'address is required').not().isEmpty(),
  check('type', 'type is required').not().isEmpty(),
  check('status', 'status is required').not().isEmpty(),
  check('level', 'level is required').not().isEmpty(),
];

exports.createStudent = [
  check('fullName', 'fullName is required').not().isEmpty(),
  check('email', 'email is required').not().isEmpty(),
  check('password', 'password is required').not().isEmpty(),
  check('address', 'address is required').not().isEmpty(),
  check('type', 'type is required').not().isEmpty(),
  check('status', 'status is required').not().isEmpty(),
  check('level', 'level is required').not().isEmpty(),
];

exports.createbook = [
  check('bookName', 'bookName is required').not().isEmpty(),
  check('author', 'author is required').not().isEmpty(),
  check('publishedYear', 'publishedYear is required').not().isEmpty(),
  check('numberOfBooks', 'numberOfBooks is required').not().isEmpty(),
  check('description', 'description is required').not().isEmpty(),
  check('status', 'status is required').not().isEmpty(),
  check('image', 'image is required').not().isEmpty(),
];

exports.createbooking = [
  check('status', 'status is required').not().isEmpty(),
  check('student', 'student is required').not().isEmpty(),
  check('book', 'book is required').not().isEmpty(),
];
