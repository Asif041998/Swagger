const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true , useUnifiedTopology: true})
.then(()=> console.log("Database Connected Successfully..."))
.catch((e)=>{
    console.log(e);
})