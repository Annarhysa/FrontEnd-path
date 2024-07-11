const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for handling form submissions
app.post('/submit', [
  // Validation rules
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
], (req, res) => {
  // Find validation errors in the request and wrap them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Handle the form data if validation passes
  res.send('Form submitted successfully!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
