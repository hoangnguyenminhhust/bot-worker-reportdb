
const { Schema } = require('mongoose');
const MgConnect = require('../config/mongoose.connect.js');

const MerchantsReport = new Schema({
  business_email: { type: String },
  business_phone: { type: String },
  business_name: { type: String },
});
MerchantsReport.index({
  business_phone: 1,

});

const MerchantsSchema = MgConnect.model('merchants-v2', MerchantsReport);
module.exports = MerchantsSchema;
