const {AuthenticationError} = require("apollo-server");
const https = require("https");

const Package = require("../../../db/models/Package");
const TransHistories = require("../../../db/models/TransHistories");
const User = require("../../../db/models/User");
const UserPackage = require("../../../db/models/UserPackage");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    createUserPackage: async (_, {packageId, amount}, context) => {
      let user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login First!");
      }
      user = await User.findById(user.id);
      const package = await Package.findById(packageId);

      if (!package) {
        throw new Error("Package Not Found!");
      }

      const {packageName, image, payDuration, interest} = package;

      let interestAmount;
      let days;
      if (interest === "30%") {
        interestAmount = (amount * 30) / 100;
      }
      if (interest === "50%") {
        interestAmount = (amount * 50) / 100;
      }
      if (interest === "80%") {
        interestAmount = (amount * 80) / 100;
      }

      if (payDuration === "7 Days") {
        days = 7;
      }
      if (payDuration === "15 Days") {
        days = 15;
      }
      if (payDuration === "30 Days") {
        days = 30;
      }

      const payDay = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);

      const endDayVal = new Date(Date.now() + 1000 * 60 * 60 * 24 * days)
        .valueOf()
        .toString();

      const newPackage = await UserPackage({
        packageName,
        image,
        amount,
        duration: payDuration,
        interest: `${interest} ( ₦ ${interestAmount.toLocaleString("en-US")})`,
        payDay: payDay.toLocaleDateString(),
        endDayVal,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });

      package.sales.unshift({
        userName: user.userName,
        joinedOn: new Date().toISOString(),
        amount,
        userId: user.id,
      });

      const currentUser = await User.findById(user.id);
      if (!currentUser) {
        throw new Error("User Not Found!");
      }
      const percentage = (amount * 10) / 100;

      const referredUser = currentUser.referredBy;

      const refUser = await User.findOne({phone: referredUser});

      if (refUser) {
        if (referredUser !== user.payedRef) {
          const creditRef = await User.findByIdAndUpdate(refUser.id, {
            referralBalance: refUser.referralBalance + percentage,
          });
          const setRef = await User.findByIdAndUpdate(user.id, {
            payedRef: referredUser,
          });

          refUser.validRefs.unshift({
            phone: currentUser.phone,
            amount,
          });

          await creditRef.save();
          await setRef.save();
          await refUser.save();
        }
        const addHistory = await TransHistories.create({
          title: `Payed for ${packageName}`,
          amount: amount.toLocaleString("en-US"),
          date: new Date().toLocaleDateString(),
          userId: user.id,
        });
        const activateUser = await User.findByIdAndUpdate(user.id, {
          active: true,
        });
        const res = await newPackage.save();
        await package.save();
        await activateUser.save();
        await addHistory.save();
        return res;
      }
      const addHistory = await TransHistories.create({
        title: `Payed for ${packageName}`,
        amount: amount.toLocaleString("en-US"),
        date: new Date().toLocaleDateString(),
        userId: user.id,
      });
      const activateUser = await User.findByIdAndUpdate(user.id, {
        active: true,
      });
      const res = await newPackage.save();
      await package.save();
      await activateUser.save();
      await addHistory.save();
      return res;
    },
  },
};
