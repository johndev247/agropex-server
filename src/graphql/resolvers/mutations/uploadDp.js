const User = require("../../../db/models/User");
const checkAuth = require("../../../utils/checkAuth");
const {AuthenticationError} = require("apollo-server-errors");
const userUpload = require("../../../utils/userUpload");

module.exports = {
  Mutation: {
    uploadDp: async (_, {file}, context) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login First", {errors: "Login First"});
      }
      const url = await userUpload(file);
      return {
        url,
      };
    },
  },
};
