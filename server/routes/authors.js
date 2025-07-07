const express = require('express');
const router = express.Router();

const Author = require('../models/Author');

/**
 * TODO: Use router to define all CRUD operations: 1- get all, 2- get by id, 3- post a new author, 4- update an author, and 5- delete an author.
 *       Make sure to follow best practices as much as you can: use try-catch, use status codes efficiently,
 *       and use console.log or console.error to print errors.
 *       Make sure to cover the cases of getting, deleting and updating an item that doesn't exist in the array, which should return: not found code (404)
 *
 *       Follow the same rules of status codes and logic described in books routes.
 *
 *       Notice that post request now is a little simpler here. There is no checking of validity of "author_id" value here.
 */

router.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll();
    return res.status(200).json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.sendStatus(404);
    }
    return res.status(200).json(author);
  } catch (error) {
    console.error('Error fetching author:', error);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newAuthor = await Author.create({ name });

    return res.status(201).json(newAuthor);
  } catch (error) {
    console.error('Error creating author:', error);
    return res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const author = await Author.findByPk(id);
    if (!author) {
      return res.sendStatus(404);
    }
    author.name = name;
    await author.save();
    return res.status(200).json(author);
  } catch (error) {
    console.error('Error updating author:', error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.sendStatus(404);
    }
    await author.destroy();
    return res.status(204).json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    return res.sendStatus(500);
  }
});

/* TODO: End */
module.exports = router;
