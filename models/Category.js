// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({

//   title: String,
//   image:String,

// });

// const Category = mongoose.model('categories', categorySchema);

// module.exports = Category;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categories:[
    {
      categoryId: String,
      title: String,
      image: String,
      dishes: [
        {
          _id: String,
          id: Number,
          name: String,
          description: String,
          price: String,
          image: String,
        },
      ]
    }
  ]
  
  
});

const Category = mongoose.model("items", categorySchema);

module.exports = Category;

