const {AuthenticationError, UserInputError} = require("apollo-server");
const TransHistories = require("../../../db/models/TransHistories");

const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");
module.exports = {
  Mutation: {
    withdraw: async (_, {amount}, context) => {
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
      const balance = userToEdit.balance;
      if (balance < amount) {
        throw new UserInputError("Error", {
          errors: {balance: "Insufficient Balance"},
        });
      }

      userToEdit.withdraw.unshift({
        title: `Withdraw MainBal`,
        amount: amount.toLocaleString("en-US"),
        requestDate: new Date().toLocaleDateString(),
      });

      const withdraw = await User.findByIdAndUpdate(userId, {
        balance: balance - amount,
      });

      const addHistory = await TransHistories.create({
        title: `Withdraw`,
        amount: amount.toLocaleString("en-US"),
        date: new Date().toLocaleDateString(),
        userId,
      });
      await withdraw.save();
      await addHistory.save();

      const res = await userToEdit.save();
      return res;
    },
  },
};
