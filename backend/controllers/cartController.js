const Cart = require("../models/Cart");

// Sepete ürün ekleme
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity
    });

    res.status(201).json({
      message: "Ürün sepete eklendi",
      cartItem
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sepeti listeleme
exports.getCartByUserId = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};