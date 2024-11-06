const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the form at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Handle form submission
app.post('/submit', upload.single('carPhoto'), (req, res) => {
    const { username, password, carMake } = req.body;
    const carPhoto = req.file;

    // Display input data and uploaded photo
    res.send(`
        <h1>Submitted Information</h1>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><strong>Car Make:</strong> ${carMake}</p>
        <p><strong>Car Photo:</strong></p>
        <img src="/uploads/${carPhoto.filename}" alt="Car Photo" style="width: 200px;">
    `);
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
