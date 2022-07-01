const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const response = require('../configurations/response');
const User = require('../models/User');

const AuthRoutes = {
  authenticate: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const user = await User.getUserByEmail(email);

      if (!user) {
        return response.fail(
          req,
          res,
          response.messages.server_error,
          'Invalid credentials'
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return response.fail(
          req,
          res,
          response.messages.server_error,
          'Invalid credentials'
        );
      }
      const payload = {
        user: {
          id: user.id,
          type: user.type,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return response.success(req, res, { token, user }, 'Authenticated');
        }
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
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }
      const { fullName, email, password, address, type, status, level } =
        req.body;
      const salt = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        fullName,
        email,
        password: encryptedPassword,
        address,
        type,
        status,
        level,
      };
      const result = await User.createUser(newUser);
      const createdUser = await User.getUserById(result?.insertId);
      return response.success(req, res, { user: createdUser }, 'Registered');
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
module.exports = AuthRoutes;
