const {AuthenticationError} = require("apollo-server");

const Package = require("../../../db/models/Package");
const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    deletePackage: async (_, {packageId}, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login Is Required!", {
          errors: {Login: "Login Is Required!"},
        });
      }
      const currentUser = await User.findById(user.id);
      if (!currentUser) {
        throw new Error("User Not Found!");
      }
      if (currentUser.role !== "admin") {
        throw new AuthenticationError("Only Admin Can Add New Package!");
      }

      const package = await Package.findById(packageId);
      if (!package) {
        throw new Error("Package Not Found!");
      }
      const deletePackage = await Package.findByIdAndRemove(packageId);
      return deletePackage;
    },
  },
};
