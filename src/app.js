const mongoose = require('mongoose');
const app = require('../api/index');

const config = require('./scripts/config');

//start server
const boot = async () => {
  // Connect to mongodb
  await mongoose.connect(config.mongoUri, config.mongoOptions);
  // Start express server
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};

boot();



