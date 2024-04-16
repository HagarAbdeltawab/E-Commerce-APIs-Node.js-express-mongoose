import cartModel from "../../../../db/models/cart.model.js";
import orderModel from "../../../../db/models/order.model.js";
import productModel from "../../../../db/models/product.model.js";
import userModel from "../../../../db/models/user.model.js";
import { HandleError } from "../../../middleware/HandleError.js";
import { AppError } from "../../../utils/AppError.js";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51OivLNKI4o3vTZdFzzy8x5FXwKSfdPzd8fiXHZY3WSzHEFcXJD1WnKg0N4LerKLRjyfMZFoiw0YmC4zXHRZU5OWj00iq4PJ6mz")

// for cash order
export const createOrder = HandleError(
    async(req, res) =>{
        // cart id from params
        let cart = await cartModel.findById(req.params.id);
        // total  price
        let totalOrderPrice = cart.totalPriceAfterDiscount?  cart.totalPriceAfterDiscount : cart.totalPrice;
        // create order
        let order = new orderModel({
            user: req.user._id,
            orderItems: cart.cartItems,
            totalOrderPrice,
            shippingAddress: req.body.shippingAddress,
        })
        // update sold, quantity
        if(order){
            // update more one field by bulk -> fast , insert & update  in one query
            let options = cart.cartItems.map(ele => ({
                updateOne: {
                    filter: {_id: ele.product},
                    update: {$inc: { quantity: -ele.quantity, sold : ele.quantity}},
                }
            }))
            await productModel.bulkWrite(options);
            await order.save();
        }else{
            return next(new AppError('Error',409));
        }
        // remove cart
        await cartModel.findByIdAndDelete(req.params.id);
        res.json({message: 'success', data: order});
    });

export const getOrder = HandleError(
    async(req, res) =>{
        let order =await orderModel.findOne({user:req.user.id}).populate('orderItems.product');
        res.json({message: 'success', order});
    });

export const getAllOrder = HandleError(
    async(req, res) =>{
        let order =await orderModel.find()
        res.json({message: 'success', order});
    });

// for online order
export const onlinePayment = HandleError(
    async(req, res) =>{
        let cart = await cartModel.findById(req.params.id);
        let totalOrderPrice = cart.totalPriceAfterDiscount?  cart.totalPriceAfterDiscount : cart.totalPrice;
        let session = await stripe.checkout.sessions.create({
            line_items: [
                {
                price_data: {
                    currency: "egp",
                    unit_amount: totalOrderPrice *100,
                    product_data: {
                        name: req.user.name
                    },
                },
                quantity: 1,
                },
            ],
            "mode": "payment",
            // redirect to success page
            success_url: "https://route-comm.netlify.app/#/",
            // redirect to cancel page
            cancel_url: "https://route-comm.netlify.app/#/cart",
            customer_email:  req.user.email,
            // unique id for the order use it if you want to get the order 
            client_reference_id: req.params.id,
            metadata: req.body.shippingAddress
        });
    res.json({message: 'success', session});
});   

export const createOnlineOrder = HandleError(
    async(req,res,next)=>{
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, "whsec_AR2fnjl6jRU4WEDTFQlPrSnODZTjr0nV");
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        // Handle the event
        if(event.type == "checkout.session.completed"){
            const e = event.data.object;
            let cart = await cartModel.findById(e.client_reference_id);
            if(!cart) return next(new AppError("not valid cart", 400));
            let user = await userModel.findOne({email: e.customer_email});
            if(!user) return next(new AppError("not valid user", 400  ));
            let order = new orderModel({
                user: e.customer_email,
                orderItems: cart.cartItems,
                totalOrderPrice: e.amount_total / 100,
                shippingAddress: e.metadata,
                paymentType: "Card",
                isPaid: true,
                paidAt: Date.now(),
                isDelivered: true,
                deliveredAt: Date.now()
            }) 
            await order.save();
            if(order){
                // update more one field by bulk -> fast , insert & update  in one query
                let options = cart.cartItems.map(ele => ({
                    updateOne: {
                        filter: {_id: ele.product},
                        update: {$inc: { quantity: -ele.quantity, sold : ele.quantity}},
                    }
                }))
            await productModel.bulkWrite(options); 
            // delete cart
            await cartModel.findByIdAndDelete(cart._id);
            }
        }else{
            console.log(`Unhandled event type ${event.type}`);
        }
    });