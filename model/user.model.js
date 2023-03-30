const mongoose=require("mongoose");



const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true
    }
    ,
    bio:{
        type:String,
        required:true
    }
    ,
    password:{
        type:String,
        required:true,
        minlength:[6],
        select:false
    },

    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
    ],

    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    friendRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ]
})


const User=mongoose.model("user",schema);



module.exports={User}