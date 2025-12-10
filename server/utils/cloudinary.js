const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "notes_app_tasks",
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

const deleteFromCloudinary = (imageUrl) => {
    return new Promise((resolve, reject) => {
        if (!imageUrl) return resolve();

        // Extract public_id from URL
        // Example: https://res.cloudinary.com/.../app_folder/my_image.jpg
        // Public ID: app_folder/my_image
        try {
            const urlParts = imageUrl.split('/');
            const filenameWithExt = urlParts[urlParts.length - 1];
            const folder = urlParts[urlParts.length - 2];
            const publicId = `${folder}/${filenameWithExt.split('.')[0]}`;

            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error("Cloudinary Delete Error:", error);
                    reject(error);
                } else {
                    console.log(`Deleted from Cloudinary: ${publicId}`, result);
                    resolve(result);
                }
            });
        } catch (err) {
            console.error("Error parsing Cloudinary URL:", err);
            resolve(); // Resolve anyway to not break the flow
        }
    });
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
