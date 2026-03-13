const Order = require("../models/Order");

// Sipariş oluşturma
exports.createOrder = async (req, res) => {
  try {
    const { userId, cartId, paymentMethod } = req.body;

    const order = await Order.create({
      userId,
      cartId,
      paymentMethod
    });

    res.status(201).json({
      message: "Sipariş başarıyla oluşturuldu",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};