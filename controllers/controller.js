const Register = require('../model/schema');
const {registrationValidations} = require('../validations/validation');
const {loginValidations} = require('../validations/validation');
const jwt = require('jsonwebtoken');
const Token = require('../model/loginSchema');
const bcrypt = require('bcryptjs');

// REGISTRATION FORM
exports.Registration = async (req,res)=> {
    try
    {
        const {error} = registrationValidations(req.body);
        if(error)
        {
          return  res.status(400).send(error.details[0].message);
        } 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const register = new Register({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            role:req.body.role,
            password:hashedPassword,
            status:req.body.status
        })

        await register.save();
       return  res.status(200).send(register);
    }
    catch(e)
    {
        console.log(e);
       return res.status(400).send(e.message);
    }
}

// GET THE DETAILS OF THE REGISTERED USERS

exports.getRegisteredDetails = async (req,res)=> {
    try
    {
        const details = await Register.find();
       return res.status(200).send(details);

    }
    catch(e)
    {
        console.log(e);
       return res.status(400).send(e.message);
    }
}

//LOGIN PART
exports.logIn = async(req,res)=>{
    try
    {
      const {error} = loginValidations(req.body);
      if(error)
      {
        return  res.status(400).send(error.details[0].message);
      }

      const email = req.body.email;
      const password = req.body.password;

     const user = await Register.findOne({email});
     if(user)
     {
      const checkPassword = await bcrypt.compare(password,user.password);
      if(checkPassword && user.status === 'active')
      {
        const token = jwt.sign({_id:user._id, role:user.role}, process.env.SECRET_TOKEN ,{ expiresIn:'2m' }) 
      
        const role = user.role;

        const accessToken = new Token({
            token:token,
            userId:user._id,  
            role,
            
        });
        const loggedInUser = await accessToken.save();
        
        const responseData = {
            message: 'Successfully logged-In.',
            token: token,
            role: role,
            status:user.status
          };

      return  res.status(200).send(responseData)
      }
      else
      {
        return res.status(200).send("User is Blocked")
      }
     }
     else{
       return  res.status(200).send("User not found...")
     }
    }
    catch(e)
    {
       return  res.status(400).send(e.message);
    }
}
exports.accessRBAC = async (req,res)=> {
      try
     {
        return res.status(200).send("Successfully Authorized...");

     }
     catch(e)
     {
       return res.status(400).send(e);
     }
}

exports.passportAuth = async(req,res)=> {
  try
  {
     return res.status(201).send({message: 'Google authentication completed successfully'})
  }
  catch(e)
  {
    console.log(e);
  }
}

exports.Paginate = async(req,res) =>{
  try
  {
   let page = req.body.page || 1;
   let sort = req.body.sort;
   let limit = req.query.limit || 2;
   let productData;
   let skip;
   skip = (page-1)*limit;

  //  if(page<=1)
  //  {
  //   skip=0;
  //  }
  //  else{
  //   skip = (page-1)*limit;

  //  }
  //  if(sort)
  //  {
  //   let custSort;
  //   if(sort == 'name')
  //   {
  //     custSort ={
  //       name: 1
  //     }
  //   }
  //   else if(sort == '_id')
  //   {
  //     custSort ={
  //       _id: -1
  //     }
  //   }
  //   productData = await Register.find().sort(custSort).skip(skip).limit(limit);

  //  }
  //  else
  //  {
  //   productData = await Register.find().skip(skip).limit(limit);
  //  }
   productData = await Register.find().skip(skip).limit(limit);
   return res.status(200).send({message: "Successfull" , Data: productData , limit: limit});

  }
  catch(e)
  {
    return res.status(500).send({message: e.message});
  }
}

exports.registerPassport = async(req,res)=>{
  try
  {
    return res.status(200).render('index');
  }
  catch(e)
  {
    return res.status(500).send(e.message);
  }
}

exports.logPassport = async(req,res)=>{
  try
  {
    return res.status(200).render('login');
  }
  catch(e)
  {
    return res.status(500).send(e.message);
  }
}

exports.googleSignin = async(req,res)=>{
  try
  {
    return res.status(200).send('Logging in with google');
  }
  catch(e)
  {
    return res.status(500).send(e.message);
  }
}


















// exports.googleRedirect = async(req,res)=> {
//   try
//   {
//     return res.status(201).send({message: 'Home page has been rendered..'})

//   }
//   catch(e)
//   {
//     console.log(e);
//   }
// }



















// exports.checkStatus = async(req,res)=> {
//   try
//   {
//     const {id} = req.params;
//     const {status} = req.body;
//   }
//   catch(e)
//   {
//     return res.status(400).send(e.message);
//   }
// }