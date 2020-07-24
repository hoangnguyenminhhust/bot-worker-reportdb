const {
  CronJob,
} = require('cron');
const request = require('request');
const Merchants = require('../model/merchants.shema');
const MerchantsReport = require('../model/merchants.report.schema.js');


const job = new CronJob(
  '* * * * * *',
  async () => {
    try {
      await Merchants.aggregate([{

          $project: {
            _id: 1,
            business_email: 1,
            business_phone: 1,
            business_name: 1,
            business_address: 1,
            province_id: 1,
          },
        },
        {
          $merge: {
            into: {
              coll: 'merchants-v2',
            },
            on: '_id',
            whenMatched: 'merge', // Optional
            whenNotMatched: 'insert', // Optional
          },
        },
      ]);
      const total = await MerchantsReport.find().countDocuments();
      const limit = 500
      var offSet = Math.floor(total / limit) + 1;
      for (let skip = 0; skip < offSet; skip++) {
        const data = await MerchantsReport.findOne()
        // .limit(limit).skip(skip)
        const data2 = JSON.stringify({
          listMerchantInfo: [data],

        })
        const options = {
          method: 'POST',
          url: 'https://service.nextlend.vn/v1/request.php',
          headers: {
            'Content-Type': 'application/json',
          },
          body: await JSON.stringify({
            Fnc: 'receiveListAllMerchantFromPartner',
            Version: '1.0',
            ChannelCode: 'NEXTSHOP',
            EncData: data2,
            Checksum: '1b15118c5e7c56e0ca5de1fc7c9a8667',
          }),
        };

       await request(options, (error, response) => {
          if (error) throw new Error(error);
          console.log(response.body);
        });


      }




    } catch (error) {
      console.log(error);
    }
  },

);

module.exports = job;