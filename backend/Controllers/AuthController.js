const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User Email already exist, You can Login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userModel = new UserModel({
      name,
      email,
      password: hashedPassword,
      plainPassword: password,
    });

    await userModel.save();

    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (error) {
    console.error("Signup Error", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const logiin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const errormsg = "Auth Faild: Email Or Password is wrong";

    if (!user) {
      return res.status(409).json({
        message: errormsg,
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(409).json({
        message: errormsg,
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(201).json({
      message: "Login successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    console.error("Login Error", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  logiin,
};
