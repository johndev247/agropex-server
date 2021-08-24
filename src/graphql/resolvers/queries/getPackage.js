const Package = require("../../../db/models/Package");
module.exports = {
  Query: {
    getPackage: async (_, { packageId }) => {
      const package = await Package.findById(packageId);
      if (!package) {
        throw new Error("Package Not Found");
      }
      return package;
    },
  },
};
