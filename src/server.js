const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});
app.use('/dist', express.static('dist'));

const SERVER_PORT = 9000;
app.listen(SERVER_PORT);
console.log(`Server started at on http://localhost:${SERVER_PORT}`);
