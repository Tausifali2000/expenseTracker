import express from "express"; // Express module import
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors middleware
import path from "path"
import { ENV_VARS } from "./config/envVars.config.js";
import { connectDB } from "./config/db.config.js";

import authRoutes from "./routes/auth.routes.js";
import incomeRoutes from "./routes/income.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(cors({
  origin: ENV_VARS.CLIENT_URL || "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
 allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.listen(PORT,() => {
  console.log("Server started at " + PORT );
  connectDB()
});