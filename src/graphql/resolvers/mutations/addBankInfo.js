const {AuthenticationError, UserInputError} = require("apollo-server-errors");
const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    addBankInfo: async (
      _,
      {accountName, accountNumber, accountType, bankName},
      context
    ) => {
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

      if (accountName.trim() === "") {
        throw new UserInputError("Enter Account Name", {
          errors: {accountName: "Enter Account Name"},
        });
      }
      if (accountNumber.trim() === "") {
        throw new UserInputError("Enter Account Number", {
          errors: {accountNumber: "Enter Account Number"},
        });
      }
      if (accountType.trim() === "") {
        throw new UserInputError("Enter Account Type", {
          errors: {accountType: "Enter Account Type"},
        });
      }
      if (bankName.trim() === "") {
        throw new UserInputError("Enter Bank Name", {
          errors: {bankName: "Enter Bank Name"},
        });
      }

      const addBankInfo = await User.findByIdAndUpdate(user.id, {
        bankInfo: {
          accountName,
          accountNumber,
          accountType,
          bankName,
          addedAt: new Date().toLocaleString(),
        },
      });

      res = await addBankInfo.save();

      return res;
    },
  },
};
