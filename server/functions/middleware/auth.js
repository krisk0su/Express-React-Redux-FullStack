const config = require("../config/default.json");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //Check for token
  if (!token) {
    res.status(401).json({ msg: "No token authorization denied!!!" });
  }

  try {
    //Verify Token
    const decoded = jwt.verify(token, config.jwtSecret);

    //Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid!" });
  }
}

module.exports = auth;
