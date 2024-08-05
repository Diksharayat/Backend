const Category = require("../models/Category");
const Orders = require("../models/Orders");
const Product = require("../models/products");


const add_to_cart= async(req,res)=>{

  try {

   const cart_obj=new Cart({
    product_id:req.body.product_id,
    description:req.body.description,
    price:req.body.price,
    image:req.body.image

   });

   const cartData= await cart_obj.save();
   res.status(200).json({success:true,message:"Cart product detail",data:cartData});
    
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ success:false,message: error.message });
    res.status(500).json({ success:false,message: error.message });
  }

}

const productsController=async(req,res)=>{
  const products = await Product.find();
  res.send(products);
  
}

const categoryController=async(req,res)=>{
  try {
    const categories = await Category.find();
    res.json(categories);
} catch (err) {
    res.status(500).json({ message: err.message });
}
}


const editCategoryController = async (req, res) => {
  const { categoryId } = req.params;
  const { title, image } = req.body;

  try {
    // Update the category directly using the `$set` operator
    const result = await Category.updateOne(
      { "categories.categoryId": categoryId },
      { 
        $set: {
          "categories.$.title": title,
          "categories.$.image": image
        }
      }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Category not found or no changes made' });
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ message: 'Server error' });
  }
};






const deleteCategoryController = async (req, res) => {
  const { categoryId } = req.params;

  try {
   
    const result = await Category.updateMany(
      {},
      { $pull: { categories: { categoryId: categoryId } } }  
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


const editDishController = async (req, res) => {
  const { categoryId, dishId } = req.params;
  const { name, description, price, image } = req.body;

  try {
    // Update the specific dish in the category using `$set`
    const result = await Category.updateOne(
      { 'categories.categoryId': categoryId, 'categories.dishes._id': dishId },
      { 
        $set: {
          'categories.$[category].dishes.$[dish].name': name,
          'categories.$[category].dishes.$[dish].description': description,
          'categories.$[category].dishes.$[dish].price': price,
          'categories.$[category].dishes.$[dish].image': image
        }
      },
      {
        arrayFilters: [
          { 'category.categoryId': categoryId },
          { 'dish._id': dishId }
        ]
      }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Dish or Category not found or no changes made' });
    }

    res.status(200).json({ message: 'Dish updated successfully' });
  } catch (err) {
    console.error('Error updating dish:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  editDishController
};

const deleteDishController = async (req, res) => {
  const { categoryId, dishId } = req.params;

  try {
      const result = await Category.updateOne(
          { 'categories.categoryId': categoryId, 'categories.dishes._id': dishId },
          { $pull: { 'categories.$.dishes': { _id: dishId } } }
      );

      if (result.nModified === 0) {
          return res.status(404).json({ message: 'Dish or Category not found' });
      }

      res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (err) {
      console.error('Error deleting dish:', err);
      res.status(500).json({ message: 'Server Error' });
  }
};




const dishesController = async (req, res) => {
 try {
    const { categoryId } = req.params;

    
    const category = await Category.findOne({ 'categories.categoryId': categoryId });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const selectedCategory = category.categories.find(cat => cat.categoryId === categoryId);

    if (!selectedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const dishes = selectedCategory.dishes;

    res.status(200).json({ dishes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}




const placeOrderController = (req, res) => {
  const { uname, email, address, items, total } = req.body;
  const loggedInUserId = req?.body?.userId;
  
  if (!loggedInUserId || !email || !items || !total) {
    return res.status(400).json({ error: "Please provide userId, email, items, and total." });
  }

  Orders.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error." });
    }

    if (!user) {
      user = new Orders({
        uname: uname || '',
        userId: loggedInUserId,
        email: email,
        address: address || '',
        orders: []
      });
    }

    user.orders.push({
      items,
      total,
      date: new Date()  
    });

    user.save((err, savedUser) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save user details." });
      }
    
      return res.status(200).json({
        userId: savedUser.userId,
        uname: savedUser.uname,
        email: savedUser.email,
        address: savedUser.address,
        orders: savedUser.orders
      });
    });
  });
};





const getOrdersByUserIdController = async(req, res) => {
  const userId = req.params.userId;
  try {
  
    const orders = await Orders.find({ userId: userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getOrdersController=async(req,res)=>{
  try {
    const orders = await Orders.find(); 
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




module.exports={
  add_to_cart,
  productsController,
  categoryController,
  placeOrderController,
  dishesController,
  deleteCategoryController,
  editCategoryController,
  editDishController,
  deleteDishController,
  getOrdersByUserIdController,
  getOrdersController
}