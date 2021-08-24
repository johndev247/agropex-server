const {AuthenticationError, UserInputError} = require("apollo-server");

const Package = require("../../../db/models/Package");
const TransHistories = require("../../../db/models/TransHistories");
const User = require("../../../db/models/User");
const UserPackage = require("../../../db/models/UserPackage");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    sendToBalances: async (_, {packageId, amount}, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login First!");
      }

      const updatePackage = await UserPackage.findById(packageId);
      if (!updatePackage) {
        throw new Error("Package Not Found!");
      }
      if (updatePackage.userId != user.id || updatePackage.active === false) {
        throw new UserInputError("Action Not Allowed!", {
          errors: {update: "Action Not Allowed!"},
        });
      }

      const userToUpdate = await User.findById(user.id);
      if (!userToUpdate) {
        throw new Error("User Not Found!");
      }
      let balance = 0;
      let round5Bal = 0;
      let date;
      if (updatePackage.duration === "7 Days") {
        date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
        const interestAmount = (amount * 30) / 100;
        const grandTotal = amount + interestAmount;
        round5Bal = (grandTotal / 100) * 40;
        balance = grandTotal - round5Bal;
      }

      if (updatePackage.duration === "15 Days") {
        date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 15);
        const interestAmount = (amount * 50) / 100;
        const grandTotal = amount + interestAmount;
        round5Bal = (grandTotal / 100) * 48;
        balance = grandTotal - round5Bal;
      }

      if (updatePackage.duration === "30 Days") {
        date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        const interestAmount = (amount * 80) / 100;
        const grandTotal = amount + interestAmount;
        round5Bal = (grandTotal / 100) * 57;
        balance = grandTotal - round5Bal;
      }

      const addToBalance = await User.findByIdAndUpdate(userToUpdate.id, {
        balance: userToUpdate.balance + balance,
        round5Bal: userToUpdate.round5Bal + round5Bal,
        round5Count: userToUpdate.round5Count++,
      });
      await addToBalance.save();

      const setInactive = await UserPackage.findByIdAndUpdate(packageId, {
        active: false,
      });

      await setInactive.save();

      const addHistory = await TransHistories.create({
        title: `PayOut for ${updatePackage.packageName}`,
        amount: balance.toLocaleString("en-US"),
        date: date.toLocaleDateString(),
        userId: user.id,
      });
      await addHistory.save();
      return addToBalance;
    },
  },
};
