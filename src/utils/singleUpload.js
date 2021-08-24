const cloudinary = require("cloudinary").v2;

module.exports = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    const cloudStream = cloudinary.uploader.upload_stream(
      file,
      {
        allowed_formats: ["jpg", "png"],
        public_id: "",
        folder: "pivon/dp",
      },
      function (err, uploaded) {
        if (err) {
          reject(err);
          console.log("there was an Error");
        }
        resolve(uploaded);
      }
    );
    fileStream.pipe(cloudStream);
  });
};
