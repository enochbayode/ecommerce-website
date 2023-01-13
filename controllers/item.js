// importing the required modules
const Item = require("../models/item");
const bcrypt = require("bcrypt");
const { Utils } = require("../middlewares/utils");


// instantiating the middlewares
const utils = new Utils();

const postItem = async (req, res) => {
    try {
        const newItem = new Item({
            ...req.body,
            owner: req.user._id
        })
        await newItem.save()
        res.status(201).send(newItem)
    } catch (error) {
        console.log({error})
        res.status(400).send({message: "error"})
    }
}

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find({ });
        
        if (items) {
            res.status(200);
            return res.json({
                status: true,
                message: "All items fetched succesfully ",
                data: items,
            });
        }
        
        return res.status(400).json({
            status: false,
            message: "unable to fetch all items",
            error: utils.getMessage("ITEM_FETCHED_FAIL"),
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: "Unable to register user.",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
};

const getAnItem = async (req, res) => {
    try {
        const item = await Item.findOne({_id: req.params.id})
        if (!item){
            return res.status(400).json({
                status: false,
                message: "unable to fetch item",
                error: utils.getMessage("ITEM_EXISTENCE_ERROR"),
            });
        }

        return res.json({
            status: 200,
            message: "Item fetched successfully",
            data: item
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Unable to register user.",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
};

const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const itemExists = await Item.findById({ _id: id });
        if (!itemExists) {
            return res.status(404).json({
                status: false,
                message: "Item does not exist",
                error: utils.getMessage("ITEM_EXISTENCE_ERROR"),
            });
        }

        const deleteItem = await Item.findOneAndDelete({ _id: id });
        if (deleteItem) {
            return res.status(200).json({
                status: true,
                message: "Item successfully deleted",
            });
        } else {
            return res.status(500).json({
                status: false,
                message: "Unable to delete Item",
                error: utils.getMessage("UNKNOWN_ERROR"),
            });
        }
    } catch (error) {
        res.json({
            status: 500,
            message: "unable to delete item",
            error: utils.getMessage("UNKNOWN_ERROR")
        })
    }
};








// exporting the controllers
module.exports = {
    getAllItems,
    getAnItem,
    deleteItem,
    postItem,
}