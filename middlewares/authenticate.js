const jwt = require('jsonwebtoken');
const Token = require('../model/loginSchema');

module.exports = function checkTokens(req,res,next)
{
    const token = req.header('auth');
    if(!token) return res.status(401).json({message : "Access Denied"});

    try
    {
     jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) 
        {
          if (err.name === 'TokenExpiredError') 
          {
            const newToken = jwt.sign({id: decoded ? decoded._id : null}, process.env.SECRET_TOKEN, { expiresIn: '2m' });
            console.log(`newToken ${newToken}`);
            res.json({ newToken: newToken}); 
          }

          else
           {
            return res.status(401).json(err);
          }
        }
         else 
         {
          // if (decoded.exp < Date.now() / 1000) 
          // {
          //   // const newToken = jwt.sign({id: decoded ? decoded._id : null }, process.env.SECRET_TOKEN, { expiresIn: '2m' });    
          //   // res.json({ token: newToken });
          //   // req.user = decoded;
          //   // next();
          // } 

          // else 
          // {
            req.user = decoded;
            next();
          // }
        }
      });
    }
    catch(e)
    {
        res.status(400).json({message : "Invalid Token"});
    }

}