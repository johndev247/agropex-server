const {AuthenticationError, UserInputError} = require("apollo-server-errors");
const User = require("../../../db/models/User");
const UserPackage = require("../../../db/models/UserPackage");
const checkAuth = require("../../../utils/checkAuth");
module.exports = {
  Query: {
    getUsersPackages: async (_, __, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login Is Required!", {
          errors: {Login: "Login Is Required!"},
        });
      }

      const checkAdmin = await User.findById(user.id);
      if (!checkAdmin) {
        throw new Error("User Not Found!");
      }

      if (checkAdmin.role !== "admin") {
        throw new UserInputError("Action Not Allowed", {
          errors: "Action Not Allowed",
        });
      }
      return (usersPackages = await UserPackage.find({}));
    },
  },
};
