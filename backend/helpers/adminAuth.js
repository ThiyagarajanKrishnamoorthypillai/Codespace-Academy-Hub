const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.secret); // use your secret key
    req.admin = decoded;
    next();
  } catch (err) {
    console.error('Invalid admin token', err);
    res.status(401).send("Invalid token.");
  }
};
