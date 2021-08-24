const {model, Schema} = require("mongoose");

const userSchema = new Schema({
  userName: String,
  image: {type: String, default: "avatar"},
  firstName: String,
  middleName: {type: String, default: ""},
  lastName: String,
  gender: String,
  country: {type: String, default: "Nigeria"},
  state: String,
  email: String,
  phone: String,
  payedRef: {type: String, default: "null"},
  round5IWithDCount: {type: Number, default: 0},
  referredBy: String,
  password: String,
  balance: {type: Number, default: 0},
  round5Bal: {type: Number, default: 0},
  round5Count: {type: Number, default: 0},
  referralBalance: {type: Number, default: 0},
  role: {type: String, default: "user"},
  referred: [
    {
      phone: String,
      fullName: String,
    },
  ],
  validRefs: [
    {
      phone: String,
      amount: Number,
    },
  ],
  inbox: [
    {
      firstName: String,
      role: String,
      message: String,
      userId: String,
      sentAt: String,
    },
  ],
  bankInfo: {
    accountName: {type: String, default: ""},
    accountNumber: {type: String, default: ""},
    accountType: {type: String, default: ""},
    bankName: {type: String, default: ""},
    addedAt: {type: String, default: ""},
  },
  withdraw: [
    {
      title: String,
      amount: String,
      requestDate: String,
    },
  ],

  blackListed: {type: Boolean, default: false},
  active: {type: Boolean, default: false},
  resetToken: String,
  createdAt: String,
});

module.exports = model("User", userSchema);
