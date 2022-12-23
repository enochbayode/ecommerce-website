const Cart = require("../models/cart");
const Item = require("../models/item");
const { Utils } = require("../middlewares/utils");

// instantiating the middlewares
const utils = new Utils();

// get cart item 

const getCartItem = async(req, res) => {
    const owner = req.user._id;
    try {
        const cart = await Cart.findOne({ owner });
        if (cart & cart.items.length > 0){
            return res.json({
                status: 200,
                data: cart
            });
        }else {
            res.json({
                status: 400,
                Message: "No item found in the cart",
                // error:,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Unable to register user.",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
}

const addToCart = async(req, res) => {
    const owner = req.user._id
    const { itemId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ owner });
        const item = await Item.findOne({ _id: itemId });

        if (!item){
            return res.status(400)({
                status: false,
                message: "Item does not exist.",
                error: utils.getMessage("ITEM_EXISTENCE_ERROR"),
            })
        }

        const price = item.price;
        const name = item.name;

        //If cart already exists for user,
        if (cart){
            const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
            //check if product exists or not

            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity += quantity;
        
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                },0)
                
                cart.items[itemIndex] = product;
                await cart.save();
                res.status(200).send(cart);
              } else {
                cart.items.push({ itemId, name, quantity, price });
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                },0)
        
                await cart.save();
                res.status(200).send(cart);
              }
            } else {
              //no cart exists, create one
              const newCart = await Cart.create({
                owner,
                items: [{ itemId, name, quantity, price }],
                bill: quantity * price,
              });
              return res.status(201).send(newCart);
            }
        } catch (error) {
        console.log(error);
        // res.status(500).send("something went wrong");
    }
}

const deleteItemInCart = async(req, res) => {
    const owner = req.user._id;
    const itemId = req.query.itemId;

    try {
        let cart = await Cart.findOne({ owner });

        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            cart.bill -= item.quantity * item.price;
            if(cart.bill < 0) {
                cart.bill = 0
            } 
            cart.items.splice(itemIndex, 1);
            cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
        },0)

            cart = await cart.save();

            res.status(200).send({
                message: "Successful",
                data: cart
            });
        } else {
            res.status(404).send({
                status: "failed",
                message: "Iem not found",
                error: utils.getMessage("ITEM_EXISTENCE_ERROR")
            });
            }
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "something went wrong.",
            error: utils.getMessage("UNKNOWN_ERROR"),
        })
    }
}

// exporting the controllers
module.exports = {
    getCartItem,
    addToCart,
    deleteItemInCart
}