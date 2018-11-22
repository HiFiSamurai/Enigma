const express = require('express');
const app = express();

app.use('/', express.static('dist'));

const SERVER_PORT = 9000;
app.listen(SERVER_PORT);
console.log(`Server started at on http://localhost:${SERVER_PORT}`); // eslint-disable-line
