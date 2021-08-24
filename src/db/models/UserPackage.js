const {model, Schema} = require("mongoose");

const userPackageSchema = new Schema({
  packageName: String,
  image: String,
  amount: Number,
  duration: String,
  interest: String,
  payDay: String,
  endDayVal: String,
  active: {type: Boolean, default: true},
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: String,
});

module.exports = model("UserPackage", userPackageSchema);
