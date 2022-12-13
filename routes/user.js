import express from 'express';

// Controller
import user from '../controllers/user.js';

const router = express.Router();

router
  .get('/', user.handleGetAllUsers)
  .get('/:id', user.handleGetUserById)
  .post('/', user.handleCreateUser)
  .delete('/:id', user.handleDeleteUserById)

export default router;


// GET all users
// GET user by ID

// POST create user

// DELETE delete user by ID