import express from "express";
import { deleteUser, getUser, likeVideo, subscribeUser, unlikeVideo, unsubscribeUser, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const router=express.Router()

//update user
router.put("/:id",verifyToken,update);

//delete user
router.delete("/:id",verifyToken,deleteUser);

//get user
router.get("/find/:id",getUser);

//subscribe user
router.put("/sub/:id",verifyToken,subscribeUser);

//unsubscribe user
router.put("/unsub/:id",verifyToken,unsubscribeUser);

//like video
router.put("/like/:videoid",verifyToken,likeVideo);

//like video
router.put("/dislike/:videoid",verifyToken,unlikeVideo);

export default router;