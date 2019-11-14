module.exports = {
  DATABASE: process.env.MONGODB || 'mongodb://localhost:27017/shop-app',
  JWT_KEY: process.env.JWT_KEY || 'MY SECRET KEY',
  PORT: process.env.PORT || 3000
} 