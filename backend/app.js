require('dotenv/config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//Importar routers
const usersRouter = require('./routers/users');
const characterRouter = require('./routers/characters');
const planetsRouter = require('./routers/planets');
const filmsRouter = require('./routers/films');
const favoritesRouter = require('./routers/favorites');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');

//Enable CORS
app.use(cors());
app.options('*', cors());

//Middlewares
app.use(express.json());
app.use(morgan('tiny'));
//app.use(authJwt());
app.use(errorHandler)

const api = process.env.API_URL;

//Routers
app.use(`${api}/users`, usersRouter);
app.use(`${api}/character`, characterRouter);
app.use(`${api}/planet`, planetsRouter);
app.use(`${api}/film`, filmsRouter);
app.use(`${api}/favorite`, favoritesRouter); 

//Conexion con MongoDB
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database connection is ready');
})
.catch(()=>{
    console.log('error');
})

module.exports = app