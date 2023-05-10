require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.URL_DB)
  .then(() => console.log('Conectado en la base de datos'))
  .catch(() => console.log('Hubo un error en la conexión de base de datos'));