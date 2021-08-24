const {AuthenticationError, UserInputError} = require("apollo-server");

const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    deleteMessage: async (_, {userId, messageId}, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login Is Required!", {
          errors: {Login: "Login Is Required!"},
        });
      }
      if (userId.trim() === "") {
        throw new UserInputError("Error", {
          errors: {userId: "User Id Cannot Be Empty!"},
        });
      }
      if (messageId.trim() === "") {
        throw new UserInputError("Error", {
          errors: {messageId: "Message Id Cannot Be Empty!"},
        });
      }
      const userToDeleteMessage = await User.findById(userId);
      if (!userToDeleteMessage) {
        throw new Error("User Not Found!");
      }
      const messageIndex = userToDeleteMessage.inbox.findIndex(
        (m) => m.id === messageId
      );
      if (userToDeleteMessage.inbox[messageIndex].userId === user.id) {
        userToDeleteMessage.inbox.splice(messageIndex, 1);
        await userToDeleteMessage.save();
        return userToDeleteMessage;
      } else {
        throw new UserInputError("Action Not Allowed!", {
          errors: {delete: "Action Not Allowed!"},
        });
      }
    },
  },
};
