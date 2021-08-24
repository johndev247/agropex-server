const {UserInputError, AuthenticationError} = require("apollo-server");

const Package = require("../../../db/models/Package");
const {createPackageValidator} = require("../../../utils/validators");
const checkAuth = require("../../../utils/checkAuth");
const User = require("../../../db/models/User");

module.exports = {
  Mutation: {
    createPackage: async (
      _,
      {userInput: {packageName, image, payDuration, description, interest}},
      context
    ) => {
      const user = checkAuth(context);
      if (!user) {
        throw new AuthenticationError("Login Is Required!", {
          errors: {Login: "Login Is Required!"},
        });
      }
      const {valid, errors} = createPackageValidator(
        packageName,
        image,
        payDuration,
        description,
        interest
      );
      if (!valid) {
        throw new UserInputError("Error", {errors});
      }
      const currentUser = await User.findById(user.id);
      if (!currentUser) {
        throw new Error("User Not Found!");
      }
      if (currentUser.role !== "admin") {
        throw new AuthenticationError("Only Admin Can Add New Package!");
      }
      const newPackage = await Package({
        packageName,
        image,
        payDuration,
        description,
        interest,
        createdAt: new Date().toISOString(),
      });
      const res = await newPackage.save();
      return res;
    },
  },
};
