const express = require("express");
const cartrouter = express.Router();
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

const cart = require('../controllers/cart');

const {
        validateUser, 
    } = require('../middlewares/user.validation')

cartrouter.get("/getitem", auth.tokenRequired, cart.getCartItem);
cartrouter.post("/additem", auth.tokenRequired, cart.addToCart);
cartrouter.delete("/deleteitem", auth.tokenRequired, cart.deleteItemInCart);



module.exports = { cartrouter };