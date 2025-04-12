import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { addExpense, deleteExpense, downloadExpense, fetchExpense } from "../controllers/expense.controllers.js";



const router = express.Router(); 

router.post("/addExpense", protectRoute, addExpense); 
router.get("/fetchExpense", protectRoute, fetchExpense); 
router.get("/downloadExpense", protectRoute, downloadExpense); 

router.delete("/deleteExpense/:id", protectRoute, deleteExpense); 




export default router;