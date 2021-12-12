const express = require('express');

require('dotenv').config();

const app = express();
const errorMiddleware = require('./middlewares/error');

const PORT = process.env.PORT || 5000;

app.use(require('./routes'));
app.use(errorMiddleware);

const db = require('./models/index');

const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('DB connected!!!');

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`),
    );
  } catch (error) {
    console.log('Connection failed!\n', error);
  }
};

start();
