const express = require('express');
const {check}=require('express-validator')

const User=require('../models/user');
const sharp=require('sharp');
const multer= require('multer');
const storage=multer.memoryStorage();
const filefilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb('invalid image feild ',false)
    }
}
const  uploads = multer({storage,filefilter})

const router = express.Router();
const {isAuth}=require('../middleware/auth')
const {createuser, userSignIn} = require('../controllers/user');
const {ValidateUserSignUp, userValidation,ValidateUserSignIn}=require('../middleware/validator/user')

router.post('/create-user',ValidateUserSignUp,userValidation,createuser);
router.post('/sign-in',userSignIn,ValidateUserSignIn,userValidation);
router.post('/upload-profile',isAuth ,uploads.single('profile'), async(req,res)=>{
    const {user}=req
    if(!user)return res.status(401).json({success:false,message:'unauthorize access'});

    try{
        const profilebuffer =req.file.buffer
        const {width,height} = await sharp(profilebuffer).metadata()
         const avatar = await sharp(profilebuffer).resize(Math.round(width*0.5),Math.round(height*0.5)).toBuffer();
         await User.findByIdAndUpdate(user._id,{ avatar })
         res.status(201).json({success:true, message:'your profile is updated'})
        console.log(avatar);
    }catch(error){
        res.status(500).json({success:false, message:'server error, try after some time'})
        console.log('Error while uploading profile',error.message)
    }
    
})


module.exports =router;

