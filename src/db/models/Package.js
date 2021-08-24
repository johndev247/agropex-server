const {model, Schema} = require("mongoose");

const packageSchema = new Schema({
  packageName: String,
  image: String,
  payDuration: String,
  description: String,
  interest: String,
  active: {type: Boolean, default: true},
  sales: [
    {
      userName: String,
      joinedOn: String,
      amount: Number,
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      active: Boolean,
    },
  ],
  createdAt: String,
});

module.exports = model("Package", packageSchema);
