import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.config.js";


export const tokenGenerate = (userId, res) => {
	const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });
    
	res.cookie("jwt-expenseTracker", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in Milli-seconds
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: false,
	});

	
	return token;

};