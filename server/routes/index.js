const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator');
const student = require('./student');
const auth = require('./auth');
const book = require('./book');
const booking = require('./booking');

//public routes
router.post('/auth', validator.authenticate, auth.authenticate);
router.post('/face-verify', validator.faceVerify, auth.faceVerify);
router.post('/auth/register', validator.register, auth.register);

//student routes
router.post('/admin/student', validator.createStudent, student.createStudents);
router.get('/admin/student', student.getAllStudents);
router.delete('/admin/student/:id', student.deleteStudent);

//book routes
router.post('/admin/book', validator.createbook, book.createBooks);
router.get('/admin/book', book.getAllBooks);
router.delete('/admin/book/:id', book.deleteBook);
router.get('/student/book/:studentId', book.getAllBooksByStudent);

//booking routes
router.post('/admin/booking', validator.createbooking, booking.createBooking);
router.put(
  '/admin/booking/:bookId',
  validator.returnBooking,
  booking.returnBooking
);

module.exports = router;
