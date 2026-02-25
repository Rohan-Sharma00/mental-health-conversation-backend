const User = require("../models/User");

exports.createUser = async (req, res) => {

  try {

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const user = new User(req.body);

    const savedUser = await user.save();

    res.status(201).json({
      message: "User created successfully",
      data: savedUser
    });

  } catch (err) {

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    res.status(500).json({
      message: "Something went wrong"
    });

  }

};