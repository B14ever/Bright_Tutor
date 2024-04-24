const mongoose = require('mongoose')
const Customers = new mongoose.Schema({
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

    Email: {
        type: String,
        requier: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    credentials:{
        type: String,
        enum: ['Driving License', 'Passport', 'ID Card', 'Other'],
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
    
}, { timestamps: true })
module.exports = mongoose.model('Customers', Customers)