const User = require("../../../db/models/User");

module.exports = {
  Query: {
    getUser: async (_, {userId}) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw new Error("User Not Found!");
      }
    },
  },
};
