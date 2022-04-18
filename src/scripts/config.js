/**
 * DO NOT edit this file.
 * Copy this file to src/config.js which is ignored by git.
 * Then edit that file.
 *
 * Note on mongodb uri
 * We can pass uri which contains everything (user, password, database).
 * Such uri would look like this 'mongodb+srv://username:password@project.yourid.mongodb.net/database?retryWrites=true&w=majority'
 * But it's much harder to read and edit
 * I suggest using mongoUri as below and pass other things as options
 **/

// const mongoUri =  'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.jztj3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//  module.exports = mongoUri ;
  
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4001,
  mongoUri: process.env.MONGO_URI,
  mongoOptions: {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DATABASE,
    retryWrites: true,
    w: 'majority',
  },
};