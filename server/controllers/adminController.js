
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const validateAdmin = require("../utils/validation");

exports.registerAdmin = async (req, res) => {
  
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  try {
    const error = validateAdmin(req.body);

    if (error)
      return res.status(400).json({ success: false, message: error });

    const { fullName, email, password } = req.body;

    const exists = await Admin.findOne({ email });

    if (exists)
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });

    const admin = await Admin.create({
      fullName,
      email,
      password: await hashPassword(password),
    });

    const adminData = admin.toObject();
delete adminData.password;

res.status(201).json({
  success: true,
  message: "Admin Registered Successfully",
  token: generateToken(admin._id),
  admin: adminData,
});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin)
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });

    const match = await bcrypt.compare(password, admin.password);

    if (!match)
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });

    const adminData = admin.toObject();
delete adminData.password;

res.json({
  success: true,
  token: generateToken(admin._id),
  admin: adminData,
});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getAdmin = async (req, res) => {
  res.json(req.admin);
};