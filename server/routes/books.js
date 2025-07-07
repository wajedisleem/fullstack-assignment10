const express = require('express');
const router = express.Router();

const Book = require('../models/Book');
const Author = require('../models/Author');

// The first get method is provided below.
router.get('/', async (req, res) => { // Get all books
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**
 * TODO: Use router to define the rest of CRUD operations: get by id, post a new book, update a book, and delete a book.
 *       Make sure to follow best practices as much as you can: use try-catch, use status codes efficiently,
 *       and use console.log or console.error to print errors.
 *       Make sure to cover the cases of getting, deleting and updating an item that doesn't exist in the array, which should return: not found code (404)
 *
 *
 */

/**
 *  Should return 200 on successful get, 404 if book not found and 500 on error.
 *
 */
router.get('/:id', async (req, res) => { // Get one book by ID
  try {
    // TODO..
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.sendStatus(404);
    }
    return res.status(200).json(book);
  } catch (error) {
    // TODO..
    console.error('Error fetching book:', error);
    return res.sendStatus(500);
  }
});

/**   When creating a new book, you need to assigne an auhtor to it through author_id.
 *     You need to check if author_id provided in the request is valid, which means it is available in the authors array.
 *     If it doesn't exist in the array, or if it is missing from the request, you should give it a default value of 999, i.e. anonymous author.
 *
 *     Important: ids of books should be incremental. In books array in data.js we have two books with ids 1 and 2 respectively.
 *     Next added book should have id 3, and the next should have id of 4 and so on.
 *
 *     You should also return "Bad request (400)" if name or price are missing.
 *
 *     Should return 201 on successful post, and 500 on error.
 */
router.post('/', async (req, res) => {   //  Add a new book
  try {
    // TODO..
    let { name, price, author_id = 999 } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!price) {
      return res.status(400).json({ message: 'Price is required' });
    }

    const author = await Author.findByPk(author_id);
    if (!author) {
      author_id = 999;
    }

    const newBook = await Book.create({
      name,
      price,
      author_id
    });

    return res.status(201).json(newBook);
  } catch (error) {
    // TODO..
    console.error('Error creating book:', error);
    return res.sendStatus(500);
  }
});

/**
 *    Make sure to cover the case of updating an item that doesn't exist in the array, which should return: not found code (404)
 *
 *    Should return 200 on successful put, and 500 on error.
 */
router.put('/:id', async (req, res) => { // Update a book by ID
  try {
    // TODO..
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.sendStatus(404);
    }

    let { name, price, author_id } = req.body;
    if (name) {
      book.name = name;
    }
    if (price) {
      book.price = price;
    }
    if (author_id) {
      const author = await Author.findByPk(author_id);
      if (!author) {
        author_id = 999;
      }
      book.author_id = author_id;
    }

    await book.save();

    return res.status(200).json(book);
  } catch (error) {
    // TODO..
    console.error('Error updating book:', error);
    return res.sendStatus(500);
  }
});

/**
 *    Make sure to cover the case of deleting an item that doesn't exist in the array, which should return: not found code (404)
 *
 *    Should return 204 on successful delete, and 500 on error.
 */
router.delete('/:id', async (req, res) => { // Delete a book by ID
  try {
    // TODO..
    const { id } = req.params;
    const books = await Book.findByPk(id);
    if (!books) {
      return res.sendStatus(404);
    }
    await books.destroy();
    return res.status(204).send({ message: 'Book has been deleted successfully' });
  } catch (error) {
    // TODO..
    console.error('Error deleting book:', error);
    return res.sendStatus(500);
  }
});

module.exports = router;
