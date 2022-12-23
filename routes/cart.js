const express = require("express");
const cartrouter = express.Router();
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

const cart = require('../controllers/cart');
const {
        validateUser, 
    } = require('../middlewares/user.validation')

cartrouter.get("/getitem", validateUser, cart.getCartItem);
cartrouter.post("/additem", validateUser, cart.addToCart);
cartrouter.delete("/deleteitem", validateUser, cart.deleteItemInCart);


module.exports = { cartrouter };