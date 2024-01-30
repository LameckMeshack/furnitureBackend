const Product = require("../models/Products");
const Cart = require("../models/Cart");

module.exports = {
  addToCart: async (req, res) => {
    const { userId, cartItem, quantity } = req.body;
    try {
        const cart = await Cart.findOne({userId})
        //TO D0
    } catch (error) {}
  },
  getCart: async (req, res) => {},
  deleteCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
    } catch (error) {}
  },
  decrementCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
    } catch (error) {}
  },
};
