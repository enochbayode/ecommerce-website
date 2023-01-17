const express = require("express")
const Order = require("../models/order")
const Cart = require("../models/cart")
const User = require("../models/user")
const Auth = require("../middleware/auth")

const getOrder = async(erq, res) => {
    const owner = req.user._id;
    try {
        const order = await Order.find({ owner: owner }).sort({ date: -1 });
        if(order) {
            return res.status(200).json({
                status: true,
                message: "Order found",
                data: order
            });
        }

        return res.status(404).json({
            status: false,
            message: "Not found.",
            error: utils.getMessage("NO_ORDER_FOUND"),
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Unable to register user.",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
}

const orderCheckout = (req, res) => {

}


// exporting the controllers
module.exports = {
    getOrder,
    orderCheckout
}