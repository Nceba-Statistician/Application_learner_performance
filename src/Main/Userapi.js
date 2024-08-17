

const express = require('express');

const app = express();

app.get('/users_input', (req, res) => {
  // Example list of users
  const usersList = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];

  // Send the usersList as a response to the client
  res.send(usersList);
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
