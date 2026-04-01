const express = require("express");
const app = express();

const connectDB = require("./config/database");
const blogRoutes = require("./routes/blog");

// middleware
app.use(express.json());

// DB connect
connectDB();

// routes
app.use("/api/v2", blogRoutes);

// server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});