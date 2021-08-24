const {AuthenticationError, UserInputError} = require("apollo-server");
const TransHistories = require("../../../db/models/TransHistories");

const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");
module.exports = {
  Mutation: {
    withdrawRoundBal: async (_, {amount}, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login Is Required!", {
          errors: {Login: "Login Is Required!"},
        });
      }

      const chkSpcRegX = /\s/;
      if (chkSpcRegX.test(amount)) {
        throw new UserInputError("Amount Cannot Contain Space", {
          errors: "Amount Cannot Contain Space",
        });
      }

      const userId = user.id;
      const userToEdit = await User.findById(userId);
      const rnd5Balance = userToEdit.round5Bal;

      if (amount > rnd5Balance || amount === 0) {
        throw new UserInputError("Error", {
          errors: {balance: "Insufficient Balance"},
        });
      }

      const twentyPercent = (rnd5Balance * 20) / 100;
      const tenPercent = (rnd5Balance * 5) / 100;

      if (userToEdit.round5Count < 5) {
        throw new UserInputError("Error", {
          errors: {balance: "Must Have Invested 5Times"},
        });
      }

      if (amount > twentyPercent && userToEdit.round5IWithDCount === 0) {
        throw new UserInputError("Error", {
          errors: {balance: "Try Smaller Amount!"},
        });
      }

      if (
        amount > tenPercent &&
        !userToEdit.validRefs.length >= 4 &&
        userToEdit.round5IWithDCount === 1
      ) {
        throw new UserInputError("Error", {
          errors: {balance: "Try Smaller Amount!"},
        });
      }

      if (
        amount > twentyPercent &&
        !userToEdit.validRefs.length >= 6 &&
        userToEdit.round5IWithDCount === 2
      ) {
        throw new UserInputError("Error", {
          errors: {balance: "Try Smaller Amount!"},
        });
      }

      if (
        amount > twentyPercent &&
        !userToEdit.validRefs.length >= 8 &&
        userToEdit.round5IWithDCount === 3
      ) {
        throw new UserInputError("Error", {
          errors: {balance: "Try Smaller Amount!"},
        });
      }

      if (userToEdit.round5IWithDCount > 3) {
        throw new UserInputError("Error", {
          errors: {balance: "You Must Have An Active Product"},
        });
      }

      userToEdit.withdraw.unshift({
        title: `Withdraw Rnd5Bal`,
        amount: amount.toLocaleString("en-US"),
        requestDate: new Date().toLocaleDateString(),
      });

      const withRnd5 = await User.findByIdAndUpdate(userId, {
        round5Bal: userToEdit.round5Bal - amount,
      });

      const addWithCount = await User.findByIdAndUpdate(userId, {
        round5IWithDCount: userToEdit.round5IWithDCount + 1,
      });

      const addHistory = await TransHistories.create({
        title: `Withdraw from Ref`,
        amount: amount.toLocaleString("en-US"),
        date: new Date().toLocaleDateString(),
        userId,
      });
      await withRnd5.save();
      await addWithCount.save();
      await addHistory.save();

      const res = await userToEdit.save();
      return res;
    },
  },
};
