const express = require("express");
const itemrouter = express.Router();
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

const item = require('../controllers/item');

itemrouter.post("/postitem", item.postItem);
itemrouter.get("/getallitem", auth.tokenRequired, item.getAllItems);
itemrouter.get("/getanitem", auth.tokenRequired, item.getAnItem);
itemrouter.delete("/deleteitem", auth.tokenRequired, item.deleteItem);


module.exports = { itemrouter };