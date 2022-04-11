const express = require('express');

const userRouter = express.Router();

// external router
const recordRouter = require('./record');

//user router
userRouter.post('/login', (req, res, next)=>{});
userRouter.post('/register', (req, res, next)=>{});
userRouter.get('/me', (req, res, next)=>{
    res.send(`It's work!`)
});
userRouter.put('/me', (req, res, next)=>{});

//record router
userRouter.use('/me/records', recordRouter);

module.exports = userRouter ;

/* original code
app.post('./users/login', (req, res, next)=>{});
app.get('./users/me', (req, res, next) => {});
app.put('./users/me', (req, res, next) =>{});
app.post('./users/register', (req, res, next)=>{});
*/