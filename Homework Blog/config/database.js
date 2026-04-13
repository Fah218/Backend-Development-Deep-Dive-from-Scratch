const mongoose = require("mongoose")

const dbconnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=> console.log("DB ka connection is successful"))
    .catch((error)=> {
        console.log("Issue in DB connection");
        console.error(error.message)
        process.exit(1);
    })
}

module.exports = dbconnect;