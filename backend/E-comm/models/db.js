const moongose=require('mongoose')
moongose.connect(process.env.MAIN_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("our db is connected");
}).catch(err=>console.log(err.message));
