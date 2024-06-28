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
  }

}

const productsController=async(req,res)=>{
  const products = await Product.find();
  res.send(products);
  
}

const placeOrderControlller = (req, res) => {
  
  const { name, email, address, items, total } = req.body;

  
  if (!name || !email || !address) {
    return res.status(400).json({ error: "Please fill all the required fields." });
  }

 
  Orders.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error." });
    }
    
    if (!user) {
      user = new Orders({
        name,
        email,
        address,
        orders: []
      });
    }

    user.orders.push({
      items,
      total
    });

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



module.exports={
  add_to_cart,
  get_cart_items,
  productsController,
  placeOrderControlller
}