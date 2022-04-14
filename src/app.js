// import express
const express = require('express');

// import body-parser for receive request's input data
const bodyParser = require('body-parser');

// import cors
const cors = require('cors');

//import external routers
const userRouter = require('./routes/user');

//import mongoose 
const mongoose = require('mongoose');

// import config
const config =require('./scripts/config')

// define express instance for use it in this server
const app = express();

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

//start server
const boot = async () => {
    // Connect to mongodb
    await mongoose.connect(config);
    // Start express server
    app.listen(4000, () => {
      console.log(`Server is listening on port 4000`);
    });
  };
  
  boot();



