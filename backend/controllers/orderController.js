const CatchAsyncError = require("../middleware/CatchAsyncError");
const Order=require("../models/orderModel")
const ErrorHandler=require("../utils/errorHandler")
//Create New Order
exports.newOrder=CatchAsyncError( async (req,res,next)=>{
    const{
     user,
     name,
     slotNos,
     quantity,
     itemsPrice,
     totalPrice,
     id,
     status,
     paidAt,
     createdAt
    }=req.body;
    const order=await Order.create({
        user,
        name,
        slotNos,
        quantity,
        itemsPrice,
        totalPrice,
        id,
        status,
        paidAt,
        createdAt
    })
    res.status(200).json({
        success:true,
        order
    })
})
//Get single Order
exports.getSingleOrder=CatchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate('user')
    if(!order){
      return next(new ErrorHandler(`Order not found with this id:${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        order
    })
})
//Get LoggedIn User Orders
exports.myOrders=CatchAsyncError(async(req,res,next)=>{
    const orders=await Order.find({user:req.user.id})
    if(!orders){
      return next(new ErrorHandler(`cart is empty`,404))
    }
    res.status(200).json({
        success:true,
        orders
    })
})
//Admin Get All Orders
exports.orders=CatchAsyncError(async(req,res,next)=>{
    const orders=await Order.find();
    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })
    if(!orders){
      return next(new ErrorHandler(`cart is empty`,404))
    }
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})
//Admin:Update Order /Order Status
exports.updateOrder=CatchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(order.orderStatus=='Delivered'){
      return next(new ErrorHandler(`Order has been already delivered`,404))
    }
    //Updating the Product Stock Of Each Order Item
    order.orderStatus=req.body.orderStatus;
    order.deliveredAt=Date.now();
    await order.save()
    res.status(200).json({
        success:true,
    })
});

//Admin:Delete Order 
exports.deleteOrder = CatchAsyncError(async (req, res, next) => {
    const order = await Order.findByIdAndRemove(req.params.id);
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true
    })
})