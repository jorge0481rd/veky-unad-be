const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const pool = require("../db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor, baby");
  }
});

router.post("/add", authenticateToken, async (req, res) => {
  const { name, price } = req.body;
  try {
    const newProduct = await pool.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
