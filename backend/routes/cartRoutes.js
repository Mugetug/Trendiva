const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCartByUserId
} = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/:userId", getCartByUserId);

module.exports = router;