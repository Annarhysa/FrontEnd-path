const express = require('express');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'lab9_index.html'));
});

app.post('/submit', [
    check('userName')
        .isLength({ min: 3, max: 20 }).withMessage('Name must be between 10 and 20 characters'),
    check('userEmail')
        .isEmail().withMessage("Email should be a valid email address")
        .isLength({ min: 5 }).withMessage("Email must be at least 5 characters"),
    check('userNumber')
        .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits')
        .isNumeric().withMessage('Mobile number must be an integer'),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.json({ message: 'Form submitted successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
