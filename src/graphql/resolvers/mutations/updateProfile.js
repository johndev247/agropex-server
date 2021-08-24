const {AuthenticationError, UserInputError} = require("apollo-server-errors");
const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    updateProfile: async (
      _,
      {firstName, middleName, state, lastName},
      context
    ) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login First", {errors: "Login First"});
      }

      const userToUpdate = await User.findById(user.id);
      if (!userToUpdate) {
        throw new Error("User Not Found!");
      }

      if (firstName.trim() === "") {
        throw new UserInputError("First Name Cannot Be Empty");
      }
      if (lastName.trim() === "") {
        throw new UserInputError("Last Name Cannot Be Empty");
      }
      if (state.trim() === "") {
        throw new UserInputError("State Cannot Be Empty");
      }

      const updateUser = await User.findByIdAndUpdate(user.id, {
        firstName,
        middleName,
        lastName,
        state,
      });
      const res = await updateUser.save();
      return res;
    },
  },
};
