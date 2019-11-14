const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../config');

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ').pop();
    if (!token) {
      return res.status(401).json({
        message: 'Auth failed. Token not provided'
      })
    }
    const decoded = jwt.verify(token, JWT_KEY);
    next();

  } catch(err) {
    return res.status(401).json({
      message: 'Auth failed. No token authorization'
    })
  } 

}