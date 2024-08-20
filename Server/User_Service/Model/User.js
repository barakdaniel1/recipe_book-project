const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = require('../../Recipe_Service/Model/Recipe');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
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