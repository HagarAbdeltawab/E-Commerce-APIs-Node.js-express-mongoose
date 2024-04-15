import cartModel from "../../../../db/models/cart.model.js";
import couponModel from "../../../../db/models/coupon.model.js";
import productModel from "../../../../db/models/product.model.js";
import { HandleError } from "../../../middleware/HandleError.js";
import { AppError } from "../../../utils/AppError.js";
import { calcPrice } from "../../../utils/calcPrice.js";

export const createCart = HandleError(
    async(req, res) =>{
        // check if product exist
        let product = await productModel.findById(req.body.product)
        !product && next( new AppError('product not found',404));
        // check if product is sold out
        if(product.quantity < req.body.quantity) return next(new AppError('sold out'))
        // get product price
        req.body.price = product.price;
        // check cart is exist or not
        let isCartExist = await cartModel.findOne({user: req.user._id})
        if(!isCartExist){
            //create cart
            let cart = new cartModel({
                user: req.user._id,
                cartItems: [req.body]
            });
            calcPrice(cart);
            await cart.save();
            return res.json({message: 'success', cart})
        } 
        // check if product is exist in cart
        let item = isCartExist.cartItems.find(el => el.product  == req.body.product);
        if (item) {
            // check if product is sold out
            if(item.quantity >= product.quantity) return next(new AppError('sold out'))//?/////////////////////////??
            // update quantity
            item.quantity += req.body.quantity || 1
        }  
        else  isCartExist.cartItems.push(req.body);
        calcPrice(isCartExist);
        await isCartExist.save();
        res.json({message: 'success', isCartExist});
    });

export const getCart = HandleError(
    async(req, res) =>{
        let cart = await cartModel.findOne({user : req.user._id});
        res.json({message: 'success', cart});
    });

export const updateQuantity = HandleError(
    async(req, res, next) =>{ 
        let data = await cartModel.findOne({user: req.user._id});
        !data && next(new AppError("Not found.",404));
        let item = data.cartItems.find(item => item._id == req.params.id);
        if(!item) return next(new AppError("Not found.",404));
        item.quantity = req.body.quantity;
        calcPrice(data);
        await data.save();   
        data && res.json({message: "Success",data});
    });

export const removeCartItem = HandleError(
    async(req, res) =>{
        let data = await cartModel.findOneAndUpdate(
            {user: req.user._id},
            {$pull:{cartItems: {_id: req.params.id}}},
            {new: true});
        calcPrice(data);
        await data.save();
        res.json({message: "success",data});
    });

export const clearUserCart = HandleError(async(req,res,next)=>{
    let data = await cartModel.findOneAndDelete({user:req.user._id});
    !data && next(new AppError("Not found.",404));
    data && res.json({message: "Success", data});
});

export const applyCoupon = HandleError(async(req,res,next)=>{
    //get coupon from param
    let coupon = await couponModel.findOne({code:req.body.coupon, expire:{$gte:Date.now()}})
    !coupon && next(new AppError("invalid coupon",401))
    // get coupon discount and calc discount
    let cart = await cartModel.findOne({user:req.user._id})
    !cart && next(new AppError("not found",401)) 
    cart.totalPriceAfterDiscount =  cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.discount = coupon.discount
    await cart.save()
    res.json({message: "Success", cart})
})