const cloudinary = require("cloudinary");

module.exports = async (upload) => {
  const {createReadStream} = await upload;
  const stream = createReadStream();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  let resultUrl = "";
  const cloudinaryUpload = async ({stream}) => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.v2.uploader.upload_stream(
          {timeout: 120000},
          function (error, result) {
            if (result) {
              resultUrl = result.secure_url;
              resolve(resultUrl);
            } else {
              reject(error);
            }
          }
        );

        stream.pipe(streamLoad);
      });
    } catch (err) {
      throw new Error(`Failed to upload profile picture ! Err:${err.message}`);
    }
  };

  await cloudinaryUpload({stream});
  return resultUrl;
};
