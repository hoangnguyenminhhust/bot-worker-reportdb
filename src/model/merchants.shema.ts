
import { Schema } from 'mongoose';
import MgConnect from '../config/mongoose.connect';

const MerchantSchema = new Schema({
  organizationId: { type: Schema.Types.ObjectId, default: null },
  merchantCoreId: { type: Schema.Types.ObjectId, default: null },
  // Ngành hàng kinh doanh Chọn trong list, list theo MPOS
  field: { type: String, default: null },
  name: { type: String, default: null },
  // Loại hình công ty Chọn: Hộ kinh doanh cá thể, Công ty TNHH, Công ty Cổ phần,
  // Doanh nghiệp tư nhân, Công ty hợp danh
  type: { type: String, default: null },
  taxNo: { type: String, default: null },
  address: { type: String, default: null },
  // Đại diện pháp luật
  representedBy: { type: String, default: null },
  // Ngày cấp giấy phép kinh doanh
  licenseDate: { type: Date },
  // Ngày hoạt động
  organizeDate: { type: Date },
  phone: { type: String, default: null },
  email: { type: String, default: null },
  locations: {
    countryId: { type: String, default: null },
    country: { type: String, default: null },
    provinceId: { type: String, default: null },
    province: { type: String, default: null },
    districtId: { type: String, default: null },
    district: { type: String, default: null },
    wardId: { type: String, default: null },
    ward: { type: String, default: null },
  },
  // active ,inactive, delete , registered
  status: { type: String, default: 'active' },
  licenseCode: { type: String, default: null },
  // tracking nmerchant
  createdAt: { type: Date },
  updatedAt: { type: Date },
  updatedBy: { type: Schema.Types.ObjectId, default: null },
  expiredTime: { type: Date },
  dbHost: { type: String, default: null },
  dbPort: { type: String, default: null },
  dbName: { type: String, default: null },
  dbUsername: { type: String, default: null },
  dbPassword: { type: String, default: null },
  dropDd: { type: Boolean, default: false },
  employees: [],
  emailSale: { type: String, default: null, index: true },
  // status UNPAID || PAID || PENDDING || FAIL || DONE
  statusPayment: { type: String, default: 'UNPAID', index: true },
  // status_locked UNLOCKER || LOCKER
  statusLocked: { type: String, default: 'UNLOCKER', index: true },
  // CONTACTED || NOTCONTACTED
  statusContact: { type: String, default: 'NOTCONTACTED', index: true },
  // TRIAL , EXTENDEDTRIAL ,ACTIVED, OUTDATE
  statusPeriod: { type: String, default: 'TRIAL', index: true },
}, {
  timestamps: true,
});

// Add full-text search index
MerchantSchema.index({
  name: 'text',
  phone: 'text',
  email: 'text',
});
const MerchantsSchema = MgConnect.model('merchants', MerchantSchema);
export default MerchantsSchema;
