const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator');
const admin = require('./admin');
const auth = require('./auth');

//public routes
router.post('/auth', validator.authenticate, auth.authenticate);
router.post('/auth/register', validator.register, auth.register);

//admin routes
router.post('/admin/student', validator.createStudent, admin.createStudents);
router.get('/admin/student', admin.getAllStudents);
router.delete('/admin/student/:id', admin.deleteStudent);

module.exports = router;
