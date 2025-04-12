import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { addIncome, deleteIncome, downloadIncome, fetchIncome } from "../controllers/income.controllers.js";


const router = express.Router(); 

router.post("/addIncome", protectRoute, addIncome); 
router.get("/fetchIncome", protectRoute, fetchIncome); 
router.get("/downloadIncome", protectRoute, downloadIncome); 

router.delete("/deleteIncome/:id", protectRoute, deleteIncome); 




export default router;