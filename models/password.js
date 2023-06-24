const mongoose=require('mongoose')
const passwordSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    passkey:{
        type:String,
        required:true
    },
    link:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})
const Password=mongoose.model('Password',passwordSchema);
module.exports=Password