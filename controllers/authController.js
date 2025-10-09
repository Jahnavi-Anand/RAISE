import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Startup from "../models/startup.js";
import Investor from "../models/investor.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


export const signup = async (req, res) => {
  try {
    const { role, name, email, password, ...extra } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (role === "startup") user = await Startup.create({ name, email, password: hashedPassword, ...extra });
    else if (role === "investor") user = await Investor.create({ name, email, password: hashedPassword, ...extra });
    else return res.status(400).json({ message: "Invalid role" });

    const token = generateToken(user._id, role);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const Model = role === "startup" ? Startup : Investor;
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, role);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
