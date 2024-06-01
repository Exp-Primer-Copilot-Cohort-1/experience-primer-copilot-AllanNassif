// Create web server
// Create RESTful API
// Create CRUD API

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create web server
const app = express();

// Set the port
const port = 3000;

// Set the path to the data file
const dataPath = path.join(__dirname, 'data', 'comments.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create RESTful API
app.get('/api/comments', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }
    res.json(JSON.parse(data));
  });
});

// Create CRUD API
app.post('/api/comments', (req, res) => {
  const newComment = {
    id: Date.now(),
    ...req.body,
  };

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }

    const comments = JSON.parse(data);
    comments.push(newComment);

    fs.writeFile(dataPath, JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Server Error');
      }
      res.json(comments);
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});