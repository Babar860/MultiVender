const jwt=require('jsonwebtoken');
const User=require('../models/user');

exports.isAuth= async(req,res,next)=>{
  
    if(req.headers && req.headers.authorization){

        const token =  req.headers.authorization.split(' ')[1]
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECERT)
            const user = await User.findById(decode.userId);
            if(!user){
                return res.json({success:false,message:'unathorizated access'})
            }
            req.user= user
            next();
        }catch(error){
                if(error.name === 'JsonWebTokenError'){
                  return   res.json({success:false,message:'unathorizated access'})
                }
                if(error.name === 'TokenExpireError'){
                    return   res.json({success:false,message:'sesson Expired access'})
                  }
                  res.json({success:false,message:'Internal server error'})

        }
       
    }else{
        res.json({success:false,message:'unathorizated access'})
    }

};