const mongoose = require("mongoose");

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connection successful");
    } catch (error) {
        console.log("Issue in DB connection");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports.connect = dbconnect;