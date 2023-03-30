

// try{
    // }
    // catch(err){
    //     return res.status(400).send({"msg":err.message})
    // }

const { Post } = require("../model/post.model")

exports.post=async (req,res)=>{
    try{
      const post=await Post.find();
      return res.status(200).send(post)
    }
    catch(err){
        return res.status(400).send({"msg":err.message})
    }
}


exports.createPost=async (req,res)=>{
try{
       const {text,image}=req.body;
       if(text==undefined || image==undefined){return res.status(400).send({"Msg":"ENter all details"})}
       const id=req.user;
     const post =await Post.insertMany([{user:id,text,image}])
     return res.status(201).send({"msg":"You have created a post"})
    }
    catch(err){
        return res.status(400).send({"msg":err.message})
    }
}


exports.updatePost=async (req,res)=>{
    try{
           const {text,image}=req.body;
           const id=req.user;
          const postId=req.params.id
         const post =await Post.findOne({_id:postId,user:id})
         if(!post){
            return res.status(400).send({"msg":"Something went wrong"})
         }
         if(text!=undefined){
         post.text=text;
           await post.save()
         }
         if(image!=undefined){
            post.image=image;
            await post.save()
         }
         return res.status(204).send({"msg":"You have been updated a post"})
        }
        catch(err){
            return res.status(400).send({"msg":err.message})
        }
    }

 exports.deletePost=async (req,res)=>{
    try{ 
        const postid=req.params.id;
        const id=req.user
        const post =await Post.findOne({_id:postid,user:id})
        if(!post){
            return res.status(400).send({"msg":"You cannot delete someone else post"})
        }
        await Post.findByIdAndDelete(postid)
        return res.status(202).send({"Msg":"post has been deleted successfully"})


    }
    catch(err){
        return res.status(400).send({"msg":err.message})
    }

 }   


 exports.likepost=async (req,res)=>{
    
    try{
    const id=req.user;
    const postid=req.params.id;
    const post=await Post.findById(postid);
     if(!post){
        return res.status(400).send({"msg":"Post didn't found "})
     }
     if(post.likes.includes(id)){
        return res.status(401).send({"msg":"You have already liked this post"})
     }else{
        post.likes.push(id)
        await post.save()
        return res.status(201).send({"msg":"You have  liked this post successully"})
     }

    }
    catch(err){
        return res.status(400).send({"msg":err.message})
    }
 }

 exports.comment=async (req,res)=>{
    try{
        const {text}=req.body;
        const id=req.user;
        const postid=req.params.id;
        const post=await Post.findById(postid);
        let comment ={
            user:id,
            text
        }
        post.comments.push(comment);
        await post.save();
        return res.status(201).send({"msg":"You have added a comment"})
    }
    catch(err){
        return res.status(400).send({"msg":err.message})
    }
 }

 exports.detailofPost=async (req,res)=>{
    try{
        const id=req.params.id;
        const post=await Post.findById(id);
        return res.status(200).send(post)
    }
    catch(err){
        return res.status(400).send({"msg":err.message})
    }
 }