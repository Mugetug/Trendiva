const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Trendiva API çalışıyor");
});

const PORT = process.env.PORT || 3000;

// 🔥 ÖNEMLİ: önce DB, sonra server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server ${PORT} portunda çalışıyor`);
      console.log("MongoDB bağlantısı başarılı ve server aktif 🚀");
    });

  } catch (err) {
    console.error("Server başlatılamadı ❌", err);
  }
};

startServer();