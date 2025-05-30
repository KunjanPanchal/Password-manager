import mongoose from "mongoose"

const Passwords = mongoose.Schema({
    site: String,
    username:String,
    password:String,
    id:String,
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',    
    required: true
  }
});

export default mongoose.model("passwords",Passwords);