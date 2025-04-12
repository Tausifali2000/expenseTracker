import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { authCheck, login, logout, signup } from "../controllers/auth.controllers.js";

const router = express.Router(); 

router.post("/signup", signup); //Signup

router.post("/login", login); //Login
router.post("/logout", logout); //Logout

router.get("/getUser", protectRoute, authCheck); //Checks user




export default router;