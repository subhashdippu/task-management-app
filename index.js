const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./api/config/db");

const authRoutes = require("./api/routes/authRoutes");
const taskRoutes = require("./api/routes/taskRoutes");
const dashboardRoutes = require("./api/routes/dashboardRoutes");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
