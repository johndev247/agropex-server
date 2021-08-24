const {UserInputError} = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../../../db/models/User");

module.exports = {
  Mutation: {
    resetPasswordRequest: async (_, {email}) => {
      const emlRegX =
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (email.trim() === "") {
        throw new UserInputError("Email Cannot Be Empty", {
          errors: {
            email: "Email Cannot Be Empty",
          },
        });
      } else {
        if (!email.match(emlRegX)) {
          throw new UserInputError("Email Must Be A Valid Email!", {
            errors: {
              email: "Email Must Be A Valid Email!",
            },
          });
        }
      }

      const userToReset = await User.findOne({email});
      if (!userToReset) {
        throw new UserInputError("Email Not Found!", {
          errors: {
            user: "Email Not Found!",
          },
        });
      }

      const randomToken = crypto.randomInt(1, 90000000).toString();
      console.log(randomToken);

      //TODO: Email API To Send Reset Token

      const resetToken = await bcrypt.hash(randomToken, 12);
      const updateToken = await User.findByIdAndUpdate(userToReset.id, {
        resetToken,
      });
      res = await updateToken.save();
      return res;
    },
  },
};
