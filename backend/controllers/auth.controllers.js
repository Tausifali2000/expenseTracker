import { User } from "../models/user.model.js"; 
import bcryptjs from "bcryptjs";
import { tokenGenerate } from "../utils/token.util.js";




//signup function
export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

   //Already Existing Email 
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, field: "email", message: "Email already exists" });
    }

   

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

   
    await newUser.save();
    
    tokenGenerate(newUser._id, res); //generate cookie

   
    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: newUser
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function login (req, res) {
  try {
		const { email, password } = req.body; 

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    //Find Email
		const user = await User.findOne({ email: email });  
		
    if (!user) {
			return res.status(404).json({ success: false, field: "all", message: "Invalid credentials" });
		}

    //Match Password
		const isPasswordCorrect = await bcryptjs.compare(password, user.password); 

		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, field: "all", message: "Invalid credentials" });
		}

		//Generate Cookie
    tokenGenerate(user._id, res); 

		res.status(200).json({ 
			success: true,
			user: {
				...user._doc,
				password: "", 
			},
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}


//logout function
export async function logout (req, res) {
  try {
		 //clear cookie
    res.clearCookie("jwt-expenseTracker");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}


//authCheck
export async function authCheck(req, res) {
	try {
		
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}
