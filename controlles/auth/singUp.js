const { User } = require("../../models");
const { Conflict } = require("http-errors");

const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    password: hashPassword,
    name,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: { email, name },
    },
  });
};

module.exports = signup;