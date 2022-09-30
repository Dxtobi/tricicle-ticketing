const mongoose=require('mongoose')

const customerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phNumber: { type: String },
  password: { type: String },
  accountType: {
    type: Boolean,
    default: false
  },
});
module.exports=mongoose.model('customerInfo',customerSchema)