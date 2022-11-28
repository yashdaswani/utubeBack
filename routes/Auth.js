const express = require("express");
import { googleAuth, signin, signup } from "../controllers/auth.js";
const router = express.Router();


//Create a User
router.post("/signup",signup)


//Sign In
router.post("/signin",signin)


//Google Auth
router.post("/google",googleAuth) 

export default router;