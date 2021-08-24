const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (res) => {
  return jwt.sign(
    {
      id: res.id,
      userName: res.userName,
      firstName: res.firstName,
      middleName: res.middleName,
      lastName: res.lastName,
      email: res.email,
      phone: res.phone,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};
