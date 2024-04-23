const mongoose = require('mongoose')
const Users = new mongoose.Schema({
    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['Admin','Tutors','Customer']
    },
    RefreshToken:[String],
    otp:{
        code:{
            type:Number,
            require:true
        },
        ValidUntil:{
            type:Date,
            require:true
        },
        attempts:{
            type:Number,
            default:0
        }
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model('Users',Users)