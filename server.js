const express = require('express');
const dotenv = require('dotenv');

const job = require('./src/cronjob/worker.backup.js');

const app = express();

dotenv.config();

job.start();
app.listen(process.env.PORT, (e) => {
  if (e) console.log(e);
  console.log('Server Backup Report Start In :', process.env.PORT);
});
