const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
  recipename: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    require: true
  },
  tags: {
    type: String,
    required: false
  }
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Boolean,
            default: true
        },
        Admin: Boolean
    },
    password: {
        type: String,
        required: true
    },
    recipes: [recipeSchema],
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);