const express=require('express');
require('dotenv').config();
require('./models/db');
const userrouter=require('./routes/user');

const User=require('./models/user')

const app=express();

app.use(express.json());
app.use(userrouter)
// const test=async (email,password)=>{
//     const user = await User.findOne({email:email});
//     const result=await user.comparePassword(password);
//     console.log(result);
// };
// test('babarsaeed@gmail.com','12234567');


app.get('/',(req,res)=>{
   res.json({success:true,message:'welcome to backEnd Zone'});
});
// app.post('/',(req,res)=>{
//     res.send(req.body); 
//  });
app.listen(4444,()=>{
    console.log("App listen");
});


