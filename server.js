const express = require('express');
const dotenv = require('dotenv');
const request = require('request');


const app = express();
const axios = require('axios');

dotenv.config();
(async () => {
  try {
    const options = {
      method: 'GET',
      url: process.env.URL,
      headers: {
        'x-access-token': process.env.TOKEN,
      },
    };
    await request(options, (error, response) => {
      if (error) throw new Error(error);
      const jsonVal = JSON.parse(response.body);
      const totalPage = Math.floor(jsonVal.meta.pagination.total / jsonVal.meta.pagination.limit);
      for(let i = 0; i < totalPage + 1; i++) {
        const options2 = {
          method: 'GET',
          url: process.env.URL,
          headers: {
            'x-access-token': process.env.TOKEN,
          },
        };
        request(options2, (error2, response2) => {
          if (error2) throw new Error(error);
          const jsonVal2 = JSON.parse(response2.body);
          console.log(jsonVal2);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
app.listen(process.env.PORT, (e) => {
  if (e) console.log(e);
  console.log('Server Backup Report Start In :', process.env.PORT);
});
