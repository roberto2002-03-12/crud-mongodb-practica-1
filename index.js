const express = require('express');
require('dotenv').config();
require('./src/db/config/config_db');
const cors = require('cors');
const routerApi = require('./src/routes/index');

const app = express();

app.use(express.json());

app.use(cors());

routerApi(app);



app.listen(3000, () => {
  console.log(`Corriendo en puerto 3000`);
});