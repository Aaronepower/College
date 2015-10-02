var mongoose = require('mongoose')
  , Schema   = mongoose.Schema

module.exports = mongoose.model( 'User'
                               , new Schema({ username: String
                                            , password: String
                                            , images: [ path: String
                                                      , post: String
                                                      , comments: String
                                                      ]
                                            })
                               )