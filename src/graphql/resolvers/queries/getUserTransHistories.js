const {AuthenticationError} = require("apollo-server-errors");
const TransHistories = require("../../../db/models/TransHistories");
const checkAuth = require("../../../utils/checkAuth");
module.exports = {
  Query: {
    getUserTransHistories: async (_, __, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login First!", {
          errors: "Login First!",
        });
      }
      const userTranHistories = await TransHistories.find({userId: user.id});
      if (!userTranHistories) {
        throw new Error("No Package Found!");
      }
      return userTranHistories;
    },
  },
};
