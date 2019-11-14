const mongoose = require('mongoose');
const { DATABASE } = require('./config');

async function init() {
  try {
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
      
    })
    console.log('Database ok!')
  } catch(err) {
    console.log(err)
  }
}

init();