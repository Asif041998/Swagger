const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    phone: {
        type:String,
        required: true
    },
    role: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const Register =  mongoose.model('Register', registrationSchema);
module.exports = Register;
