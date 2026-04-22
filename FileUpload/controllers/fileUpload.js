const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localfileupload -> handler function
exports.localFileUpload = async (req, res) => {
    try {
        // file fetch krna h 
        const file = req.files.file;
        console.log("File AGYI HAI", file);

        // create path where file need to be store on server
        let path = __dirname + "/files/" + Date.now() + "_" + file.name;
        console.log("PATH->", path);

        // add path to the move function
        file.mv(path, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Error while uploading file locally",
                });
            }

            // create successful function
            return res.json({
                success: true,
                message: "Local file uploaded successfully",
            });
        });
    }
    catch (error) {
        console.log("Not able to upload the file on server");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload ka handler
exports.imageUpload = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files ? req.files.imageFile : null;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file provided",
            });
        }
        console.log(file);

        // Validation
        const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase(); // FIXED

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        // file format agr supported h
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        // db men entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        return res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded",
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};