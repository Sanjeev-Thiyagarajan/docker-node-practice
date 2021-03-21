const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);

  const hashPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = await User.create({
      username: username,
      password: hashPassword,
    });

    req.session.user = newUser;
    console.log(req.session);

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    console.log("tes");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log("logging in", username, password);
  try {
    const user = await User.findOne({ username });
    console.log(user);

    if (user) {
      const isCorrect = await bcrypt.compare(password, user.password);
      if (isCorrect) {
        console.log("is correct");
        req.session.user = user;
        res.status(200).json({
          status: "success",
        });
      } else {
        res.status(400).json({
          status: "fail",
          message: "incorrect username or password",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.me = async (req, res) => {
  const { _id } = req.session.user;

  try {
    const user = await User.findById(_id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {}
};
