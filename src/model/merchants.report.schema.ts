
import { Schema } from 'mongoose';
import MgConnect from '../config/mongoose.connect';

const MerchantsReport = new Schema({
  business_email: { type: String },
  business_phone: { type: String },
  business_name: { type: String },
});
MerchantsReport.index({
  business_phone: 1,

});

const MerchantsSchema = MgConnect.model('merchants-v2', MerchantsReport);
export default MerchantsSchema;
