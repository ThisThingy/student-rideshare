const express = require('express');
const router = express.Router();

// GET /api/users - Get all users
router.get('/', (req, res) => {
  res.json({ 
    message: 'User routes are working!',
    endpoints: {
      getUsers: 'GET /api/users',
      getUser: 'GET /api/users/:id',
      updateUser: 'PUT /api/users/:id',
      deleteUser: 'DELETE /api/users/:id'
    }
  });
});

// GET /api/users/:id - Get a specific user
router.get('/:id', (req, res) => {
  res.json({
    message: 'Get specific user route',
    userId: req.params.id
  });
});

// PUT /api/users/:id - Update a user
router.put('/:id', (req, res) => {
  res.json({
    message: 'Update user route',
    userId: req.params.id,
    body: req.body
  });
});

// DELETE /api/users/:id - Delete a user
router.delete('/:id', (req, res) => {
  res.json({
    message: 'Delete user route',
    userId: req.params.id
  });
});

module.exports = router;