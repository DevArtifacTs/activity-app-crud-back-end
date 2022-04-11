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


//  original router
/** users APIs 
 * login -> POST
 * display profile -> GET
 * edit profile -> PUT
 * register -> POST
 */
/*
app.post('./users/login', (req, res, next)=>{});
app.get('./users/me', (req, res, next) => {});
app.put('./users/me', (req, res, next) =>{});
app.post('./users/register', (req, res, next)=>{});
*/

/** records APIs
 * display all records of each user
 * display specific record of each user
 * create new record of each user
 * edit specific record of each user
 * delete specific record of each user
 */
/*
app.get('./users/:userId/records', (req, res, next)=>{});
app.get('./users/:userId/records/recordId', (req, res, next)=>{});
app.post('./users/:userId/records', (req, res, next)=>{});
app.put('./users/:userId/records/recordId', (req, res, next)=>{});
app.delete('./users/:userId/records/recordId', (req, res, next)=>{});
*/