const express = require("express");
const cartrouter = express.Router();
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

const cart = require('../controllers/cart');

const {
        validateUser, 
    } = require('../middlewares/user.validation')

cartrouter.get("/getcartitem", auth.tokenRequired, cart.getCartItem);
cartrouter.post("/addtocart", auth.tokenRequired, cart.addToCart);
cartrouter.delete("/deletecartitem/itemId", auth.tokenRequired, cart.deleteItemInCart);



module.exports = { cartrouter };