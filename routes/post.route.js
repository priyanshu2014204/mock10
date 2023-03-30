const express=require("express");
const { post, createPost, updatePost, likepost, deletePost, comment, detailofPost } = require("../controller/post");
const authentication = require("../middleware/auth");
const router=express.Router()

router.get('/post',post)
router.get('/post/:id',detailofPost)
router.post('/post',authentication,createPost)
router.put('/post/:id',authentication,updatePost)
router.delete('/post/:id',authentication,deletePost)
router.post('/post/:id/like',authentication,likepost)
router.post('/post/:id/comment',authentication,comment)



module.exports=router;