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

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    options.resource_type = "auto";
    if (quality) {
        options.quality = quality;
    }
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


// video upload krni hai 
exports.videoUpload = async (req, res) => {
    try {
        // data fetch kro 
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files ? req.files.videoFile : null;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No video file provided",
            });
        }

        // Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.').pop().toLowerCase(); // FIXED
        console.log("File Type", fileType);

        // limit of 5MB for Video
        const MAX_VIDEO_SIZE = 5 * 1024 * 1024; // 5 Megabytes in bytes
        if (file.size > MAX_VIDEO_SIZE) {
            return res.status(400).json({
                success: false,
                message: "Video size exceeds the 5MB upper limit",
            });
        }

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        // file format supported hai 
        console.log("Uploading to codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        // db men entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        // Also move the video locally to the controllers/files directory
        let localPath = __dirname + "/files/" + Date.now() + "_" + file.name;
        
        file.mv(localPath, (err) => {
            if (err) {
                console.error("Error saving video locally:", err);
                return res.status(500).json({
                    success: false,
                    message: "Cloudinary upload succeeded, but local save failed",
                });
            }

            // Both Cloudinary upload and local save are complete
            return res.json({
                success: true,
                videoUrl: response.secure_url,
                message: "Video successfully uploaded to Cloudinary AND saved locally",
            });
        });

    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


// image ka size reduce krna hai
exports.imageSizeReducer = async (req, res) => {
    try {
        // data fetch kro 
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files ? req.files.imageFile : null;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided",
            });
        }

        // Validation
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.').pop().toLowerCase(); // FIXED
        console.log("File Type", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        // file format supported hai 
        console.log("Uploading reduced image to codehelp");
        // pass quality to successfully reduce image size
        const response = await uploadFileToCloudinary(file, "Codehelp", 30);
        console.log(response);

        // db men entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        // Also move the image locally to the controllers/files directory
        let localPath = __dirname + "/files/" + Date.now() + "_" + file.name;
        
        file.mv(localPath, (err) => {
            if (err) {
                console.error("Error saving image locally:", err);
                return res.status(500).json({
                    success: false,
                    message: "Cloudinary upload succeeded, but local save failed",
                });
            }

            // Both Cloudinary upload and local save are complete
            return res.json({
                success: true,
                imageUrl: response.secure_url,
                message: "Image successfully reduced, uploaded to Cloudinary AND saved locally",
            });
        });

    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

