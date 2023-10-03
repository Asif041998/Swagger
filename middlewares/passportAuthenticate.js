const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Profile = require('../model/profileSchema');

module.exports = function passportMiddleware(req,res,next)
{
  
   passport.use(
       new GoogleStrategy({
      callbackURL: 'http://localhost:3000/api/google/redirect',
      clientID: '1039631097865-o28negfnmkh6nhl8tcmhcb6imt53jr2r.apps.googleusercontent.com',
      clientSecret: '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'
     },
     (accessToken , refreshToken , profile, done)=> {
           console.log('user profile is: ', profile);
           Profile.findOne({googleId:profile.id}).then((currentUser)=>{
            if(currentUser)
            {
               console.log("User already exist");
            }
            else
            {
              const profiling = new Profile({
                username: profile.displayName,
                googleId: profile.id
             });
           profiling.save();
           // res.status(200).send("User logged-in and has been stored in the database")
           console.log(profiling);
         }
      })
           
  }))
    next();
}










