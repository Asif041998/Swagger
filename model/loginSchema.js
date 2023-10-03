const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
        userId: {
         type: String,
         required:true
        },
        token:{
         type: String,
         required: true
        },
        role:{
            type:String,
        },
        createdAt: {
            type: Date,
            default: Date.now, 
            expires: 60 * 1000
        }
},

);

const Token =  mongoose.model('Token', logSchema);
module.exports = Token;
