const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const user={
    fullname:'',
    email:'',
    phone:'',
    cnic:'',
    password:'',
    cnf_pass:'',
    avatar:''
}
const userschema = new mongoose.Schema({
    fullname:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    cnic: {
        type: String,

    },
    password:{
        type: String,
    },
    cnf_pass:{
        type: String,
    },
    avatar:Buffer,
})
userschema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,8,(err, hash)=>{
            if(err) return next(err);
            this.password=hash;
            next();
        })
    }
})
    userschema.methods.comparePassword=async function(password){
     if(!password) throw new Error('Password is missing can`t compare!');
     try{
        const result= await bcrypt.compare(password, this.password);
        return result;
     } catch(error){
            console.log('Error while comparing password',error.message)
     }
    }
userschema.statics.isThisEmailInUse= async function(email){
    if(!email)throw new Error('Invalid Email');
    try{

        const user= await this.findOne({email})
        if(user)return false

        return true;

    }catch(error){
        console.log("error in this method",error.message)
        return false
    }
}
module.exports= mongoose.model('User',userschema);