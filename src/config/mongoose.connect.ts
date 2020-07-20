import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const MgConnect = mongoose.createConnection(uri, options);

mongoose.Promise = global.Promise;

export default MgConnect;
