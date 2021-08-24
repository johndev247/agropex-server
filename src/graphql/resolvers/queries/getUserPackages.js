const {AuthenticationError} = require("apollo-server-errors");
const UserPackage = require("../../../db/models/UserPackage");
const checkAuth = require("../../../utils/checkAuth");
module.exports = {
  Query: {
    getUserPackages: async (_, __, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login First!", {
          errors: "Login First!",
        });
      }
      const userPackages = await UserPackage.find({userId: user.id});
      if (!userPackages) {
        throw new Error("No Package Found!");
      }
      return userPackages;
    },
  },
};
