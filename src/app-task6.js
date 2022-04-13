// import express
const express = require('express');

// import body-parser for receive request's input data
const bodyParser = require('body-parser');

//import external routers
const userRouter = require('./routes/user');

// define express instance for use it in this server
const app = express();
app.use(bodyParser.json());

app.use('/users', userRouter);

//refactor with express router 
// if request's path is matched with this path ('/users/:userId') the request will be flow to user.js 

//start server
app.listen(4000, ()=> {
    console.log('server is listening on port 4000.')
})

