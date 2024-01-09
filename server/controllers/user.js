import User from "./../models/User.js";
import md5 from "md5";

const postApiSignup = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    const user = await User({
      email,
      password: md5(password),
      fullName,
    });
    const savedUser = await user.save();
    res.status(201).json({
      data: savedUser,
      message: "signup successfully",
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const postApiLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password: md5(password) });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json({ data: user, message: "Login successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { postApiSignup, postApiLogin };
