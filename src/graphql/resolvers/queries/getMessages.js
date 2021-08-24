const {AuthenticationError} = require("apollo-server-errors");
const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");
module.exports = {
  Query: {
    messages: async (_, __, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login First!", {
          errors: "Login First!",
        });
      }
      const currentUser = await User.findById(user.id);
      if (!currentUser) {
        throw new Error("User Not Found!");
      }
      const messages = currentUser.inbox;
      return messages;
    },
  },
};
