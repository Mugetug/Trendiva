const express = require("express");
const router = express.Router();

const { addToCart, getCartByUserId, removeFromCart } = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/:userId", getCartByUserId);
router.delete("/item/:cartItemId", removeFromCart);

module.exports = router;