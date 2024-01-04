import User from "../models/User";

const postApiSignup = async (req, res) => {
    const { email, password, fullname } = req.body;
  
    try {
      const user = await User({
        email,
        password,
        fullname,
      });
  
      const savedUser = await user.save();
      res.status(201).json({
        data: savedUser,
        message: "signup successfully",
      });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

  export { postApiSignup };