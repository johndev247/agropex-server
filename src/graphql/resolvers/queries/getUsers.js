const User = require("../../../db/models/User");

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw new Error("No User Found!", {error});
      }
    },
  },
};
