const mongoose = require('mongoose')
const Tutors = new mongoose.Schema({
    FirstName: {
        type: String,
        requier: true
    },
    LastName: {
        type: String,
        require: true
    },
    SureName: {
        type: String,
        require: true
    },
    Gender:{
        type: String,
        require: true
    },
    Age:{
        type: String,
        require: true
    },
    Email: {
        type: String,
        requier: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    TelegramUserName: {
        type: Number,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    Address:{
        City: {
            type: String,
            require: true,
        },
        SubCity:{
            type: String,
            require: true,
        }
    },
    Education:{
        level:{
            type: String,
            required: true
        },
        FieldOfStudy: {
            type: String,
            
        },
        Institute:{
            type: String,
            required: true
        },
        Cridential:{
            type:String,
            required:true
        },
        GradutedDate:{
            type:String,
        }
    },
    Tutoring:{
        TutotringDate:{
            type: Date,
            required: true
        },
        TutotringTime:{
            type: Date,
            required: true
        },
        Location:{
            type:String,
            required:true
        },
        Grade:{
            type:Number,
            required:true
        }
    },
    portfolios:{
        Bio:{
            type:String,
            required:true
        },
        Strength:{
            type:String,
            required:true
        },
        why:{  // why do you want to become a tutor
            type:String,
            required:true
        },
        how:{  // how do you hire about as
            type:String,
            required:true
        },    
        whatAction:{ // what action do you take 
            type:String,
            required:true
        },    
        WhatSkill:{  // what skill is important to become a tutor
            type:String,
            required:true
        },
        quation:{ 
            type:String,
            required:true
        }     
    },
    Status:{
        type:String,
        default:false
    }
    
}, { timestamps: true })
module.exports = mongoose.model('Tutors', Tutors)