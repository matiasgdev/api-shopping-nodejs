const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: { 
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
   },
  password: {type: String, required: true}
});

module.exports = model('User', userSchema);
