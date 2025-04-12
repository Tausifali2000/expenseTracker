import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { fetchDashboard } from "../controllers/dashboard.controllers.js";


const router = express.Router(); 

router.get("/", protectRoute, fetchDashboard); //Checks user




export default router;