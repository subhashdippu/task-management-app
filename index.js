const cors = require("cors");
const express = require("express");
const connectDB = require("./api/config/db");
const authRoutes = require("./api/routes/authRoutes.js");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
