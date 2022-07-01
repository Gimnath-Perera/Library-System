const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const moment = require('moment');
require('dotenv').config();

const response = require('../configurations/response');
const User = require('../models/User');

const AdminRoute = {
  createStudents: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }
      const { fullName, email, password, address, status, level } = req.body;
      const salt = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(password, salt);

      const newStudent = {
        fullName,
        email,
        password: encryptedPassword,
        address,
        type: 'student',
        status,
        level,
      };

      const result = await User.createUser(newStudent);
      const createdUser = await User.getUserById(result?.insertId);

      return response.success(
        req,
        res,
        {
          student: createdUser,
        },
        'Student created successfully'
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
  getAllStudents: async (req, res) => {
    try {
      const result = await User.getAllStudents();

      return response.success(
        req,
        res,
        result,
        'Student list data fetched successfully'
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
  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { affectedRows } = await User.deleteStudent(id);

      return response.success(
        req,
        res,
        affectedRows > 0 ? { id } : 'Invalid student id',
        affectedRows > 0
          ? 'Student record deleted successfully'
          : 'Invalid student id'
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

module.exports = AdminRoute;
