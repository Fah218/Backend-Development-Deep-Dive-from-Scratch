const express=require("express");
const app=express();


// load config from env file

require("dotenv").config();
const PORT = process.env.PORT || 4000;


// middleware to parse json request body

app.use(express.json())




// import routes for todo api

const todoRoutes = require("./routes/todos");


// mount todo api routes
app.use("/api/v1",todoRoutes);



app.listen(PORT,()=> {
    console.log("App is running")
})

// connect to the database

const  dbConnect =require("./config/database");
dbConnect();

// default routes

app.get("/",(req,res)=>{
    res.send("<h1>This is HOMEPAGE baby </h1>")
})