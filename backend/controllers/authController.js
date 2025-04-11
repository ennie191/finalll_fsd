const User = require("../models/User");
const { hashPassword, comparePasswords } = require("../utils/passwordUtils");
const { generateToken } = require("../utils/jwtUtils");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(201).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};