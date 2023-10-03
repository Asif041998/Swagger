const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    }
},
{timestamps:true}
);

const Profile = mongoose.model('Profile',profileSchema);
module.exports = Profile;