const express = require('express');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(require('./routes'));

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
