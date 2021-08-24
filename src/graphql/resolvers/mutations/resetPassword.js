const {UserInputError} = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../../../db/models/User");
const generateToken = require("../../../utils/generateToken");

module.exports = {
  Mutation: {
    resetPassword: async (_, {email, token, newPassword, confirmPassword}) => {
      const userToReset = await User.findOne({email});
      if (!userToReset) {
        throw new UserInputError("User Not Found!", {
          errors: {user: "User Not Found!"},
        });
      }

      if (token.trim() === "") {
        throw new UserInputError("Enter A Token", {
          errors: {token: "Enter A Token"},
        });
      }

      if (newPassword.trim() === "") {
        throw new UserInputError("Enter A Password", {
          errors: {newPassword: "Enter A Password"},
        });
      }
      if (confirmPassword.trim() === "") {
        throw new UserInputError("Enter Confirm Password", {
          errors: {confirmPassword: "Enter A Confirm Password"},
        });
      }
      if (newPassword !== confirmPassword) {
        throw new UserInputError("Password Must Match!", {
          errors: {misMatch: "Password Must Match!"},
        });
      }

      const hashedToken = userToReset.resetToken;

      const match = await bcrypt.compare(token, hashedToken);

      if (!match) {
        throw new UserInputError("Invalid Token!", {
          errors: {token: "Invalid Token"},
        });
      }

      const password = await bcrypt.hash(newPassword, 12);

      const randomToken = crypto.randomInt(1, 90000000).toString();
      const resetToken = await bcrypt.hash(randomToken, 12);

      const resetPassword = await User.findByIdAndUpdate(userToReset.id, {
        password,
        resetToken,
      });

      const loginToken = generateToken(userToReset);

      await resetPassword.save();
      return {
        ...userToReset._doc,
        id: userToReset.id,
        token: loginToken,
      };
    },
  },
};
