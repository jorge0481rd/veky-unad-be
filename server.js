const express = require("express");
const app = express();
const authRoutes = require("./routers/auth");
const productRoutes = require("./routers/products");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
