const { validationResult } = require('express-validator');
require('dotenv').config();

const response = require('../configurations/response');
const Book = require('../models/Book');

const BookRoute = {
  createBooks: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }
      const { bookName, author, publishedYear, description, status, image } =
        req.body;

      const newBook = {
        bookName,
        author,
        publishedYear,
        description,
        status,
        image,
      };

      const result = await Book.createBook(newBook);
      const createdBook = await Book.getBookById(result?.insertId);

      return response.success(
        req,
        res,
        {
          book: createdBook,
        },
        'Book created successfully'
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
  getAllBooks: async (req, res) => {
    try {
      const result = await Book.getAllBooks();

      return response.success(
        req,
        res,
        result,
        'Book list data fetched successfully'
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
  deleteBook: async (req, res) => {
    try {
      const { id } = req.params;
      const { affectedRows } = await Book.deleteBook(id);

      return response.success(
        req,
        res,
        affectedRows > 0 ? { id } : 'Invalid book id',
        affectedRows > 0
          ? 'Book record deleted successfully'
          : 'Invalid book id'
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
  getAllBooksByStudent: async (req, res) => {
    try {
      const { studentId } = req.params;
      const result = await Book.getAllBooksByStudent(studentId);

      return response.success(
        req,
        res,
        result,
        'Book list data fetched successfully'
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

module.exports = BookRoute;
