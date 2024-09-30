// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado, no se proporcionó token" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Agrega la información del usuario verificado al request
    next(); // Continua con la siguiente función
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
  }
};

module.exports = authenticateToken; // Exporta correctamente la función
