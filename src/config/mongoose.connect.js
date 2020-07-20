const mongoose = require('mongoose');
const dotenv = require('dotenv');

const uri = 'mongodb://nextsolution:password@206.189.34.192:27017/test';
const options = { useNewUrlParser: true, useUnifiedTopology: true };
dotenv.config();

const MgConnect = mongoose.createConnection(uri, options);

mongoose.Promise = global.Promise;

module.exports = MgConnect;
