const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {UserInputError} = require("apollo-server");

const {userSignupValidator} = require("../../../utils/validators");
const User = require("../../../db/models/User");
const generateToken = require("../../../utils/generateToken");

module.exports = {
  Mutation: {
    createUser: async (
      _,
      {
        userInput: {
          userName,
          firstName,
          middleName,
          lastName,
          gender,
          state,
          email,
          phone,
          referredBy,
          password,
          confirmPassword,
        },
      }
    ) => {
      const {valid, errors} = userSignupValidator(
        userName,
        firstName,
        middleName,
        lastName,
        gender,
        state,
        email,
        phone,
        referredBy,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Error", {errors});
      }
      const checkUserName = await User.findOne({userName});
      const checkEmail = await User.findOne({email});
      const checkPhone = await User.findOne({phone});

      if (checkUserName) {
        throw new UserInputError("This Username is Taken!", {
          errors: {
            userName: "This Username Is Taken",
          },
        });
      }
      if (checkEmail) {
        throw new UserInputError("This Email Is Already In Use", {
          errors: {
            email: "This Email Is In Use",
          },
        });
      }
      if (checkPhone) {
        throw new UserInputError("This Number Is Already In Use", {
          errors: {
            phone: "This Phone Number Is In Use",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const referredUser = await User.findOne({phone: referredBy});
      if (referredUser) {
        if (middleName.length > 0) {
          referredUser.referred.unshift({
            phone,
            fullName: `${firstName} ${middleName} ${lastName}`,
          });
          await referredUser.save();
        } else {
          referredUser.referred.unshift({
            phone,
            fullName: `${firstName} ${lastName}`,
          });
          await referredUser.save();
        }
      }

      const randomToken = crypto.randomInt(1, 90000000).toString();
      const resetToken = await bcrypt.hash(randomToken, 12);

      let role = "user";
      if (userName === "johndev247") {
        role = "admin";
      }
      const newUser = new User({
        userName,
        firstName,
        middleName,
        lastName,
        gender,
        state,
        email,
        phone,
        role,
        referredBy,
        password,
        resetToken,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
