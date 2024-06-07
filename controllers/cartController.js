const Orders = require("../models/Orders");
const Cart=require("../models/cartModel");
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
  }

}

const productsController=async(req,res)=>{
  const products = await Product.find();
  res.send(products);
  
}

const placeOrderControlller = (req, res) => {
  // Validate and extract data from req.body
  const { name, email, address, items, total } = req.body;

  // Check if name, email, and address fields are empty
  if (!name || !email || !address) {
    return res.status(400).json({ error: "Please fill all the required fields." });
  }

  // Find or create user based on email
  Orders.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error." });
    }
    
    if (!user) {
      // User not found, create a new user
      user = new Orders({
        name,
        email,
        address,
        orders: []
      });
    }

    // Add the new order to user's orders array
    user.orders.push({
      items,
      total
    });

    // Save the updated user details
    user.save((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save user details." });
      }
      // Return success response
      return res.status(200).json({ message: "Order placed successfully." });
    });
  });
};


const get_cart_items = async (req, res) => {
  try {
 
    const cartItems = await Cart.find();

 
    res.status(200).json({ success: true, message: "Cart items retrieved successfully", data: cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const increment_quantity = async (req, res) => {
  try {
    const { product_id } = req.body; // Get the product ID from the request parameters
    let cartItem = await Cart.findOne({ product_id }); // Find the cart item by its product ID

    // Check if the cart item exists
    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    // Increment the quantity
    cartItem.quantity = (cartItem.quantity || 1) + 1;
    await cartItem.save();

    res.status(200).json({ success: true, message: "Quantity incremented successfully", data: cartItem });
  } catch (error) {
    console.error("Error incrementing quantity:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const decrement_quantity = async (req, res) => {
  try {
    const { product_id } = req.body; // Get the product ID from the request parameters
    let cartItem = await Cart.findOne({ product_id }); // Find the cart item by its product ID

    // Check if the cart item exists
    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    // Decrement the quantity if it's greater than 1
    if ((cartItem.quantity || 1) > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    }

    res.status(200).json({ success: true, message: "Quantity decremented successfully", data: cartItem });
  } catch (error) {
    console.error("Error decrementing quantity:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const delete_item = async (req, res) => {
  try {
    const { product_id } = req.body;
    console.log(product_id,"product_id");

    // Find the cart item by its product ID and delete it
    const deletedItem = await Cart.findOneAndDelete({ product_id });

    if (!deletedItem) {
      // If the item was not found in the cart
      return res.status(404).json({ success: false, message: "Item not found in the cart" });
    }

    // If the item was successfully deleted from the cart
    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports={
  add_to_cart,
  get_cart_items,
  increment_quantity,
  decrement_quantity,
  delete_item,
  productsController,
  placeOrderControlller
}