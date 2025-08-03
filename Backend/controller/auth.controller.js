import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {config} from "dotenv"
config();
//  JWT secret key
const JWT_SECRET ="suchi";

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name,email,password)

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, "suchi", { expiresIn: '7d' });

    res.status(201).json({ message: 'User created successfully', user: {id:user.id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate token
    const token = jwt.sign({ id: user._id }, "suchi", { expiresIn: '7d' });

    res.status(200).json({ message: 'Login successful', user: {id:user.id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
