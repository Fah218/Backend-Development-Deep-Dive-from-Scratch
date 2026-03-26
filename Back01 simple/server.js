// steps:
// - folder create
// - npm init -y
// - npm i express
// create Server.js



// server instantiated

const express=require('express')
const app=express()


// used to parse req body in express -> PUT or POST
const bodyParser= require('body-parser');


// specifucally parse JSON data
app.use(bodyParser.json());




app.listen(8000, ()=>{
      console.log("server is running")
})



// Routes
app.get('/',(req,res)=>{
      res.send("hello jii");
})


app.post('/api/cars',(req,res)=>{
      const {name,brand} = req.body;
      console.log(name)
      console.log(brand)
      res.send("car submitted successfully");
})


const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/myDatabase',{
      useNewurlParser:true,
      useUnifiedTopology:true
})
.then(()=>{console.log("Connection Successfully")})
.catch((error) =>{console.log("Recieved on error")} )