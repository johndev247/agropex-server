const {AuthenticationError, UserInputError} = require("apollo-server-errors");
const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    changeRole: async (_, {userId}, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login First", {
          errors: {auth: "Login First"},
        });
      }

      const actingUser = await User.findById(user.id);
      if (!actingUser) {
        throw new UserInputError("User Not Found!", {
          errors: {user: "User Not Found!"},
        });
      }
      if (actingUser.role !== "admin") {
        throw new UserInputError("Action Not Allowed", {
          errors: {user: "Action Not Allowed!"},
        });
      }

      const userToUpdate = await User.findById(userId);
      if (!userToUpdate) {
        throw new Error("User Not Found!");
      }
      let role;
      if (userToUpdate.role === "admin") {
        role = "user";
      } else {
        role = "admin";
      }

      const changeRole = await User.findByIdAndUpdate(userId, {
        role,
      });

      res = await changeRole.save();

      return res;
    },
  },
};
