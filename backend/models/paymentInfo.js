const mongoose=require('mongoose')

const PayInfoSchema=new mongoose.Schema({
       // cardType:{type:String,enum: ["visa", "master card"]},
        
        tid:{type:String},
        name:{type:String},
        from:{type:String},
        amount:{type:String},
        to: { type: String },
        email: {type: String},
        paid: { type: String },
        date: { type: String },
        used: {
                type: Boolean,
                default: false
              },

})

module.exports=mongoose.model('PaymentInfo',PayInfoSchema)