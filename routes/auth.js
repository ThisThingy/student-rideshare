const express = require('express');
const router = express.Router();

// Test route
router.get('/', (req, res) => {
  res.json({ 
    message: 'Auth routes are working!',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      logout: 'GET /api/auth/logout'
    }
  });
});

module.exports = router;