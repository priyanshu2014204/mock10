const { User } = require("../model/user.model");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config();
// try{


// }
// catch(err){
 
// }

exports.register=async (req,res)=>{
   try{
    const {name,email,password,bio,dob}=req.body;
    if(name==undefined || email==undefined || password==undefined || bio==undefined || dob==undefined){
        return res.status(401).send({"msg":"Enter all credential"})
    }
    let user=await User.findOne({email})

    if(user){
        return res.status(400).send({"msg":"user already exist"})
    }
  bcrypt.hash(password,6,async(err,hash)=>{
        if(hash){
            await User.insertMany([{name,email,password:hash,dob,bio}]);
          return  res.status(201).send({"msg":"You have been  register"})
        }else{
         return   res.status(400).send({"msg":"an error occured"})
        }
  });
   
   }
   catch(err){
   res.status(400).send({"msg":err.message})
   }
}

exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        let user=await User.findOne({email}).select("+password");;
 
        if(!user){
            return res.status(400).send({"err":"No user found with this email"})
        }
        
        bcrypt.compare(password, user.password).then(function(result) {
       if(result){
         const token=jwt.sign({id:user._id},process.env.Secret_jwt,{ expiresIn: '1h' });
        res.status(200).send({"msg":"You have been logged in successfully","token":token})
       }
       else{
         res.status(400).send({"alert":"wrong password alert"})
       }
        });
}
catch(err){
 
}
}


exports.allregisterUser=async (req,res)=>{
     try{
        let user=await User.find();
        return res.status(200).send(user)
        }
        catch(err){
            res.status(400).send({"msg":err.message})
        }
}

exports.allfriends=async (req,res)=>{
    try{
   const id=req.params.id;
   const user=await User.findById(id);
   if(user){
     return res.status(200).send(user.friends)
   }else{
    return res.status(400).send({"msg":"Please Check the Id provided "})
   }


}
catch(err){
 
}

}

exports.sendFriendRequest=async (req,res)=>{
    try{
  const id=req.params.id;
  const userid=req.user;
  if(id==undefined){
    return res.status(400).send({"msg":"Enter the valid details"})
  }
//   console.log(id,userid,req.user)
  if(userid.toString()==id.toString()){
    return res.status(400).send({"msg":"You cannot send friend request to yourself"})
  }
  const friend =await User.findById(id);
  if(friend.friendRequests.includes(userid) || friend.friends.includes(userid)){
     return res.status(400).send({"msg":"You can't send the request"})
  }
   friend.friendRequests.push(userid)
    await friend.save()
  return res.status(201).send({"msg":`You have sended the request successfully to ${friend.name}`})

}
catch(err){
  return res.status(400).send({"msg":err.message})
}

}


exports.acceptRequest=async (req,res)=>{
    try{
  const id=req.params.id
  const friendid=req.params.friendid;
  let {status}=req.body
  if(status==undefined){
    status='reject'
  }

  const user=await User.findById(id);
  if(!user){
    return res.status(400).send({"msg":"User not found"})
  }
  if(user.friendRequests.includes(friendid)){
    let index=user.friendRequests.indexOf(friendid);
        if(index==undefined){
            return res.status(400).send({"msg":"Bad request"})
        }
        user.friendRequests.splice(index,1);
        await user.save()
     if(status=='accept'){
        user.friends.push(friendid)
        await user.save();
        return res.status(204).send({"msg":"You accepted the request"})
     }

  }
  return res.status(400).send({"msg":"Message action taken"})


}
catch(err){
 
}
}