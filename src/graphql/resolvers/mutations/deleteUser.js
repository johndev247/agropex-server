const {AuthenticationError} = require("apollo-server");
const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    deleteUser: async (_, {userId}, context) => {
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
      try {
        const deleteUser = await User.findByIdAndDelete(userId);
        const res = await deleteUser;
        return res;
      } catch (error) {
        throw new Error("User Not Found!");
      }
    },
  },
};
