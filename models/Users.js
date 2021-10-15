const mongoose= require('mongoose');
const {Schema}= mongoose;
const userSchema = new Schema({
    facebookId:String,
    googleId:String,
    credits:{
        type:Number,
        default:0
    }
});
mongoose.model('users',userSchema);
// module.exports=mongoose.model('users',userSchema);