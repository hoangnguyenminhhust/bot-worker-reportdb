const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const job = require('./src/cronjob/worker.backup.js');

const uri = 'mongodb://nextProduction2:DuDZmMDHcKkJv54rEtRG@172.31.29.239:27017/merchants?authSource=admin';
const options = { useNewUrlParser: true, useUnifiedTopology: true };
dotenv.config();

mongoose.connect(uri, options);

mongoose.Promise = global.Promise;

const app = express();


job.start();
app.listen(3000, (e) => {
  if (e) console.log(e);
  console.log('Server Backup Report Start In :', 3000);
});
