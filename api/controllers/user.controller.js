const User = require('../models/userModel');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../../config');

const bcrypt = require('bcrypt');

exports.createUser = (req, res) => {

  User.find({email: req.body.email})
    .exec()
    .then( doc => {
      if (doc.length >= 1) {
        res.status(409).json({
          message: 'Mail already exists'
        });
        return;
      } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(500).json({
                error: err
              })
              return;
        
            } else {
                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  email: req.body.email,
                  password: hash
                  });
        
                user.save()
                  .then( ()  => {
                    res.status(201).json({
                      message: 'User created successfully'
                    });
                  })
                  .catch(err => {
                    res.status(500).json({
                      error: err
                    });
                  })
              }
            })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

  
}

exports.loginUser = (req, res) => {
  User.findOne({email: req.body.email})
    .exec()

    .then( user => {
      if (user.length < 1) {
        res.status(401).json({
          message: 'Auth failed'
        });
        return;
      }
      
      bcrypt.compare(req.body.password, user.password, (err, result) => {

        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          })
        }

        if (result) {
          const token = jwt.sign({
            email: user.email,
            userId: user._id
            },
            JWT_KEY,
            {
              expiresIn: '6h'
            }
          )

          return res.status(200).json({
            message: 'Auth succesfully',
            token: token
          })
        }

        res.status(401).json({
          message: 'Password doesn\'t match'
        })
      })
    })
    .catch( err => {
      res.status(500).json({
        error: err
      })
    })
}
