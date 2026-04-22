const express = require("express")
const app = express();


// Port find krna h
require("dotenv").config();
const PORT = process.env.PORT || 3000;


// middleware add krna h 
app.use(express.json());
const fileupload = require("express-fileupload")
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// db se connect krna h 
const db = require("./config/database");
db.connect();


// cloud se connect krna h 
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();


// api route mount krna h 
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

app.listen(PORT, () => {
     console.log(`App is running at ${PORT}`);
});