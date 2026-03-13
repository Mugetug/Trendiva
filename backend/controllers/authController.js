const User = require("../models/User");
const bcrypt = require("bcryptjs");

// kullanıcı kayıt
exports.registerUser = async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Bu email zaten kayıtlı" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Kullanıcı oluşturuldu",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// kullanıcı giriş
exports.loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Şifre yanlış" });
    }

    res.status(200).json({
      message: "Giriş başarılı",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};