//const mongoose = require("mongoose");

//const connectDB = async () => {
  //try {
    //await mongoose.connect(process.env.MONGO_URI);
    //console.log("MongoDB bağlantısı başarılı");
  //} catch (error) {
    //console.error("MongoDB bağlantı hatası:", error.message);
    //process.exit(1);
  //}
//};

//module.exports = connectDB;







const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Render değişkenine güvenmek yerine linki doğrudan buraya yazıyoruz
    const connectionString = "mongodb+srv://trendivaUser:Trendiva123@cluster0.raulpkm.mongodb.net/trendivaDB?retryWrites=true&w=majority";

    await mongoose.connect(connectionString);
    console.log("-----------------------------------------");
    console.log("MONGODB BAĞLANTISI BAŞARILI - SİSTEM AKTİF");
    console.log("-----------------------------------------");
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;