const express=require("express");
const { register, allregisterUser, allfriends, login, sendFriendRequest, acceptRequest } = require("../controller/user");
const authentication = require("../middleware/auth");
const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/user',allregisterUser)
router.get('/user/:id/friends',allfriends)
router.post('/user/:id/friends',authentication,sendFriendRequest)
router.put('/user/:id/friends/friendid',acceptRequest)
router.patch('/user/:id/friends/friendid',acceptRequest)


module.exports=router;