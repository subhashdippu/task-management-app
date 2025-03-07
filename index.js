const express = require("express");
const connectDB = require("./api/config/db");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
connectDB();
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
