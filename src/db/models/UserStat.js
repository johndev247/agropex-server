const { model, Schema } = require("mongoose");

const userStatSchema = new Schema({
  blackListed: [
    {
      userName: String,
    },
  ],
  onWarning: [
    {
      userName: String,
    },
  ],
  deleted: [
    {
      userName: String,
    },
  ],
  active: [
    {
      userName: String,
    },
  ],
  createdAt: String,
});

module.exports = model("UserStat", userStatSchema);
