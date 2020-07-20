import _ from 'lodash';
import moment from 'moment-timezone';
// build obj filter
export function filters(filter:any) {
  return _.pickBy({
    _id: filter.merchantId,
    merchantCoreId: filter.merchantCoreId,
    name: filter.name && { $regex: filter.name.trim().toLowerCase(), $options: 'i' },
    type: filter.type,
    address: filter.address,
    phone: filter.phone && { $regex: filter.phone, $options: 'i' },
    email: filter.email && { $regex: filter.email.trim().toLowerCase(), $options: 'i' },
    'owner.id': filter.ownerId,
    'owner.username': filter.ownerUsername && { $regex: filter.ownerUsername, $options: 'i' },
    'owner.name': filter.ownerName && { $regex: filter.ownerName, $options: 'i' },
    'owner.phone': filter.ownerPhone && { $regex: filter.ownerPhone, $options: 'i' },
    'owner.email': filter.ownerEmail && { $regex: filter.ownerEmail, $options: 'i' },

    'locations.countryId': filter.countryId,
    'locations.provinceId': filter.provinceId,
    'locations.districtId': filter.districtId,
    'locations.wardId': filter.wardId,
    'locations.countryName': filter.countryName && { $regex: filter.countryName.trim().toLowerCase(), $options: 'i' },
    'locations.provinceName': filter.provinceName && { $regex: filter.provinceName.trim().toLowerCase(), $options: 'i' },
    'locations.districtName': filter.districtName && { $regex: filter.districtName.trim().toLowerCase(), $options: 'i' },
    'locations.wardName': filter.wardName && { $regex: filter.wardName.trim().toLowerCase(), $options: 'i' },
    organizeDate: (filter.organizeDateFrom || filter.organizeDateTo)
    && _.pickBy({
      $gte: filter.organizeDateFrom && moment.tz(filter.organizeDateFrom, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').toDate(),
      $lt: filter.organizeDateTo && moment.tz(filter.organizeDateTo, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').add(1, 'd').toDate(),
    }),
    createdAt: (filter.createdAtFrom || filter.createdAtTo)
    && _.pickBy({
      $gte: filter.createdAtFrom && moment.tz(filter.createdAtFrom, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').toDate(),
      $lt: filter.createdAtTo && moment.tz(filter.createdAtTo, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').add(1, 'd').toDate(),
    }),
    updatedAt: (filter.updatedAtFrom || filter.updatedAtTo) && _.pickBy({
      $gte: filter.updatedAtFrom && moment.tz(filter.updatedAtFrom, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').toDate(),
      $lt: filter.updatedAtTo && moment.tz(filter.updatedAtTo, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').add(1, 'd').toDate(),
    }),
  });
}
export async function sort(filter:any) {
  const objOrderBy:any = {};
  let key = 'createdtime';
  const value = filter.sort_desc ? (filter.sort_desc) * 1 : -1;
  if (filter.sort_by === 'logs') {
    key = 'logs.action_at';
    // value = filter.sort_desc ? (filter.sort_desc) * -1 : 1;
  }
  objOrderBy[key] = value;

  return objOrderBy;
}
// trim khoang trang
export function deepTrim(obj:any) {
  if (typeof obj === 'object' && obj != null) {
    const trimmedKeys:any = _.mapKeys(obj, (value, key) => deepTrim(key));
    const trimmedKeysValues:any = _.mapValues(trimmedKeys, deepTrim);
    return trimmedKeysValues;
  }
  if (typeof obj === 'string') {
    return obj.trim();
  }
  return obj;
}
