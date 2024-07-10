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





const getOrdersByUserIdController = (req, res) => {
  const { userId } = req.params;

  Orders.find({ userId })
    .then(orders => {
      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: "No orders found for this user." });
      }
      res.status(200).json({ orders });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal server error." });
    });
};






module.exports={
  add_to_cart,
  productsController,
  placeOrderController,
  getOrdersByUserIdController
}