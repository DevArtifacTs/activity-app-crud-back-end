// import express
const express = require('express');

// import body-parser for receive request's input data
const bodyParser = require('body-parser');

// import cors
const cors = require('cors');

//import external routers
const userRouter = require('../src/routes/user');

//import mongoose 
const mongoose = require('mongoose');

// PORT config
const PORT = process.env.PORT || 4001;

// import config
const config =require('../src/scripts/config')

// define express instance for use it in this server
const app = express();

if (config.isVercel) {
  app.use(async (req, res, next) => {
    await mongoose.connect(config.mongoUri, config.mongoOptions);
    return next();
  });
}

app.use(bodyParser.json());
app.use(
    cors({
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );

app.use('/users', userRouter);
//refactor with express router 
// if request's path is matched with this path ('/users/:userId') the request will be flow to user.js 

module.exports = app;