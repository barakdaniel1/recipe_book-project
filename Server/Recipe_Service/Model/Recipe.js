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
      required: true
    },
    tags: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    },
    imageKey : {
      type : String,
      required : false
    }
  });

  module.exports = recipeSchema;