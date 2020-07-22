
const { Schema } = require('mongoose');
const mongoose = require('mongoose')

const MerchantsReport = new Schema({
  business_email: { type: String },
  business_phone: { type: String },
  business_name: { type: String },
});
MerchantsReport.index({
  business_phone: 1,

});

module.exports =   mongoose.model('merchants-v2', MerchantsReport);

