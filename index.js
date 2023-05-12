const express = require('express');
require('dotenv').config();
require('./src/db/config/config_db');
const cors = require('cors');
const routerApi = require('./src/routes/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./src/middlewares/error.handler');

const app = express();

app.use(express.json());

app.use(cors());

routerApi(app);

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(3000, () => {
  console.log(`Corriendo en puerto 3000`);
});