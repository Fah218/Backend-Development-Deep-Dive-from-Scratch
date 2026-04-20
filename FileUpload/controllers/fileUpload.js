const File = require("../models/File");

// localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {
        // file fetch krna h 
        const file = req.files.file;   // FIXED

        console.log("File AGYI HAI", file);

        let path = __dirname + "/files/" + Date.now() + "_" + file.name;  // FIXED
        console.log("PATH->", path);

        file.mv(path, (err) => {
            if (err) {
                console.log(err);   // FIXED
            }
        });

        res.json({
            success: true,
            message: 'Local file uploaded successfully',
        });
    }
    catch (error) {
        console.log("Not able to upload the fule on server")
        console.log(error);   // FIXED
    }
}