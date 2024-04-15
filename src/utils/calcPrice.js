export function calcPrice(cart) {
    let totalPrice = 0;
    cart.cartItems.forEach((el)=>{
        totalPrice += el.quantity * el.price});
    cart.totalPrice = totalPrice ;
}