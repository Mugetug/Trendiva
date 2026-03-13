const Product = require("../models/Product");

// Ürün ekleme
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      stock
    });

    res.status(201).json({
      message: "Ürün başarıyla eklendi",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ürün listeleme
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ürün detayını görüntüleme
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ürün güncelleme
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    res.status(200).json({
      message: "Ürün başarıyla güncellendi",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ürün silme
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    res.status(200).json({ message: "Ürün silindi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};