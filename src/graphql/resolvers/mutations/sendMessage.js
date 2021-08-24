const {AuthenticationError, UserInputError} = require("apollo-server");

const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    sendMessage: async (_, {userId, message}, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login Is Required!", {
          errors: {Login: "Login Is Required!"},
        });
      }
      if (message.trim() === "") {
        throw new UserInputError("Error", {
          errors: {message: "Message Cannot Be Empty!"},
        });
      }

      const userToMessage = await User.findById(user.id);
      if (!userToMessage) {
        throw new Error("User Not Found!");
      }
      let userToEditId = user.id;
      if (userToMessage.role === "admin") {
        userToEditId = userId;
      }

      try {
        const sendMessage = await User.findById(userToEditId);
        sendMessage.inbox.push({
          firstName: user.firstName,
          role: userToMessage.role,
          message,
          userId: user.id,
          sentAt: new Date().toISOString(),
        });

        const res = await sendMessage.save();
        return res;
      } catch (error) {
        throw new Error("User Not Found!");
      }
    },
  },
};
