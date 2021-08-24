const {AuthenticationError, UserInputError} = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    changePassword: async (_, {prevPassword, newPassword}, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login First", {
          errors: {auth: "Login First"},
        });
      }

      const userToUpdate = await User.findById(user.id);
      if (!userToUpdate) {
        throw new Error("User Not Found!");
      }

      let password = userToUpdate.password;

      if (prevPassword !== "" && newPassword.trim() === "") {
        throw new UserInputError("Type New Password", {
          errors: {password: "Type New Password"},
        });
      }
      const match = await bcrypt.compare(prevPassword, password);
      if (!match) {
        throw new UserInputError("Previous Password Incorrect!", {
          errors: {oldPassword: "Previous Password Incorrect!"},
        });
      }

      password = await bcrypt.hash(newPassword, 12);

      const updateUser = await User.findByIdAndUpdate(user.id, {
        password,
      });
      res = await updateUser.save();
      return res;
    },
  },
};
