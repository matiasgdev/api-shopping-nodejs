const express = require('express');
const app = express();
const morgan = require('morgan');
require('./database');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

// Config
const { PORT } = require('./config');
app.set('port', PORT);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(require('./cors'));
app.use('/assets/images', express.static('./assets/uploads'));

// Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/user', userRoutes);


// Handle error routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(app.get('port'), () => {
  console.log('Server ok on port: ' + app.get('port'))
})