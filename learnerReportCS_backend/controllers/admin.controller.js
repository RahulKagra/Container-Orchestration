const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model"); // <-- adjust if your path differs

// Required env vars
const HASH_KEY = process.env.HASH_KEY;
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Small helper: HMAC-SHA256 hash
function hashPassword(plain) {
  if (!HASH_KEY) throw new Error("HASH_KEY is not set");
  return crypto.createHmac("sha256", HASH_KEY).update(plain).digest("hex");
}

/**
 * POST /admin/login
 * body: { email, password, userType? }
 */
const AdminLogin = async (req, res) => {
  try {
    const { email, password, userType } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the details", login: false });
    }
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "Server misconfigured: JWT secret missing", login: false });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password", login: false });
    }

    const incoming = hashPassword(password);
    if (admin.password !== incoming) {
      return res.status(401).json({ message: "Invalid email or password", login: false });
    }

    const payload = {
      id: admin._id.toString(),
      email: admin.email,
      userType: userType || admin.userType || "admin",
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12m" });

    return res.json({
      login: true,
      token,
      result: {
        _id: admin._id,
        email: admin.email,
        username: admin.username,
        userType: payload.userType,
      },
    });
  } catch (err) {
    console.error("AdminLogin error:", err);
    return res.status(500).json({ message: "Internal Server Error", login: false });
  }
};

/**
 * POST /admin/register
 * body: { email, password, username?, userType? }
 * Ensures same hashing scheme as login.
 */
const adminRegister = async (req, res) => {
  try {
    const { email, password, username, userType } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = hashPassword(password);
    const doc = await Admin.create({
      email,
      username,
      password: hashed,
      userType: userType || "admin",
    });

    return res.status(201).json({ message: "User registered", id: doc._id });
  } catch (err) {
    console.error("adminRegister error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { adminRegister, AdminLogin };