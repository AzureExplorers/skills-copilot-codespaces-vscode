// Create a web server
// Create a route to get all comments
// Create a route to add a new comment
// Create a route to get a specific comment
// Create a route to update a comment
// Create a route to delete a comment

const express = require('express');
const app = express();

// Middleware to parse the body of the request
app.use(express.json());

let comments = [
  {
    id: 1,
    user: 'Alice',
    comment: 'Hello World'
  },
  {
    id: 2,
    user: 'Bob',
    comment: 'Hi Alice'
  }
];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  res.status(201).json(comment);
});

app.get('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send();
  }
});

app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    comment.comment = req.body.comment;
    res.json(comment);
  } else {
    res.status(404).send();
  }
});

app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});