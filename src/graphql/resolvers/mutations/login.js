const {UserInputError} = require("apollo-server");
const bcrypt = require("bcrypt");

const {userLoginValidator} = require("../../../utils/validators");
const User = require("../../../db/models/User");
const generateToken = require("../../../utils/generateToken");

module.exports = {
  Mutation: {
    login: async (_, {emailOrPhone, password}, context) => {
      const {valid, errors} = userLoginValidator(emailOrPhone, password);
      if (!valid) {
        throw new UserInputError("Error", {errors});
      }

      const user =
        (await User.findOne({email: emailOrPhone})) ||
        (await User.findOne({phone: emailOrPhone})) ||
        (await User.findOne({userName: emailOrPhone}));
      if (!user) {
        errors.general = "User Not Found";
        throw new UserInputError("User Not Found", {
          errors: {emailOrPhone: "User Not Found"},
        });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Incorrect Password";
        throw new UserInputError("Password Incorrect", {
          errors: {password: "Password Incorrect"},
        });
      }
      if (user.blackListed === true) {
        throw new UserInputError("Account Blocked!", {
          errors: {user: "Account Blocked"},
        });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
