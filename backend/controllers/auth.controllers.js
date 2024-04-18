import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password dont match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username Already Exists" });
    }

    //HASH password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const grilProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username} `;

    console.log(fullName, username, password, confirmPassword, gender);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : grilProfilePic,
    });

    if (newUser) {
      generateTokenSetCookie(newUser._id, res);

      console.log("newUser: true");

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = async (req, res) => {
  console.log("login");
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credential" });
    }
    generateTokenSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out seccessfully " });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Pn0XKGs1w8hf9MIu
//mohammad0919najafi
