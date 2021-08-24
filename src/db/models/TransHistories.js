const {Schema, model} = require("mongoose");

const transHistorySchema = new Schema({
  title: String,
  amount: String,
  date: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
module.exports = model("transHistory", transHistorySchema);
