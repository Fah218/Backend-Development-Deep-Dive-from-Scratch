const express = require("express");
const app = express();

require("dotenv").config();

const connectDB = require("./config/database");
const blogRoutes = require("./routes/blog");

// middleware
app.use(express.json());

// DB connect
connectDB();

// routes
app.use("/api/v2", blogRoutes);

const PORT = process.env.PORT || 3000;

// server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});