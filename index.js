const express=require('express');
const connection = require('./config/db');
const app=express();
app.use(express.json())

require('dotenv').config()
const user=require('./routes/user.route');
const post=require('./routes/post.route')

app.use('/api',user)
app.use('/api',post)


app.get('/',(req,res)=>res.send({"msg":"this is the home route"}))


const port= process.env.port || 8080

app.listen(port,()=>{
    try{
        connection
   console.log(`connected to port ${port}`)
    }
    catch(err){
     console.log(err.message)
    }
})

