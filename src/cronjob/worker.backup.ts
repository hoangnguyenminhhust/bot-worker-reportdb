import { CronJob } from 'cron';
import request from 'request';
import Merchants from '../model/merchants.shema';
import MerchantsReport from '../model/merchants.report.schema';



const job = new CronJob(
  '* * * * * *',
  async () => {
    try {
      await Merchants.aggregate([
        {

          $project: {
            _id: 1,
            business_email: 1,
            business_phone: 1,
            business_name: 1,
            business_address: 1,
          },
        },
        {
          $merge: {
            into: { coll: 'merchants-v2' },
            on: '_id',
            whenMatched: 'merge', // Optional
            whenNotMatched: 'insert', // Optional
          },
        },
      ]);
      const data = await MerchantsReport.find({});

      const options = {
        method: 'POST',
        url: 'https://service.nextlend.vn/v1/request.php',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Fnc: 'receiveListAllMerchantFromPartner',
          Version: '1.0',
          ChannelCode: 'NEXTSHOP',
          EncData: {
            listMerchantInfo: {
              1801: data,
            },
          },
          'Checksum ': '1b15118c5e7c56e0ca5de1fc7c9a8667',
        }),
      };
      request(options, (error, response) => {
        if (error) throw new Error(error);
        console.log(response.body);
      });
    } catch (error) {
      console.log(error);
    }
  },

);

export default job;
