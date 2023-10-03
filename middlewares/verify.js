const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req,res,next)
{
    // const token = req.header('authToken');

    // if(!token)
    // {
    //    return res.status(400).send("Access denied");
    // }
    // try
    // {
    //     jwt.verify(token, process.env.SECRET_TOKEN, (err,decoded)=>{
    //         if(err)
    //         {
    //             console.log(err.name)
    //             return res.status(400).send(err.name);
    //         }
    //         else
    //         {
    //             req.user = decoded;
    //             next();
    //         }
    //     })

    // }
    // catch(e)
    // {
    //     res.status(400).send(e.message);
    // }

    const token = req.header('bearerAuth');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
