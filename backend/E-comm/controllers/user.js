const User=require('../models/user');
const jwt=require('jsonwebtoken');


exports.createuser = async(req,res)=>{
    const {fullname,email,phone,cnic,password,cnf_pass}=req.body;
    const isNewUser= await User.isThisEmailInUse('babarsaeed202@gmail.com');
    if(!isNewUser)
    return res.json({
        success:false,
        message:'this email is already in use , try sign in',
});
    const user = await User({
        fullname,
        email,
        phone,
        cnic,
        password,
        // cnf_pass,
    });
    await user.save();
    res.json({success:true,user});
};

exports.userSignIn= async (req,res)=>{
    const{email,password}=req.body 
    const user=await User.findOne({email})

    if(!user) return res.json({success:false,message:'user not found,with given Gmail'})

    const isMatch = await user.comparePassword(password)
    if(!isMatch) return res.json({success:false,message:'password or email does not match'});

    const token= jwt.sign({userId: user._id}, process.env.JWT_SECERT,{expiresIn:'1d'});
    const userInfo={
        fullname:user.fullname,
        email:user.email,
        avatar:user.avatar?user.avatav:'',
    };
    
    res.json({success:true, user:userInfo, token});
}; 
