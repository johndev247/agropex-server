const Package = require("../../../db/models/Package");
module.exports = {
  Query: {
    getPackages: async () => {
      const Packages = Package.find({});
      try {
        const allPackages = await Packages;
        return allPackages;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
