const Product = require("../models/Products");
const Cart = require("../models/Cart");
const { response } = require("express");

module.exports = {
  addToCart: async (req, res) => {
    const { userId, cartItem, quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId });

      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );

        if (existingProduct) {
          existingProduct.quantity + 1;
        } else {
          cart.products.push({ cartItem, quantity });
        }

        await cart.save();
        return response.status(200).json("Product added to cart");
      } else {
        const newCart = new Cart({
          userId,
          products: [
            {
              cartItem,
              quantity: quantity,
            },
          ],
        });

        await newCart.save();
        return res.status(200).json("Product added to cart");
      }
    } catch (error) {

        return res
          .status(500)
          .json({ error: error.message, message: "Failed to add product" });

    }
  },
  getCart: async (req, res) => {
    const userId = req.params.id;

    try {
      const cart = await Cart.find({ userId }).populate(
        "products.cartItem",
        "_id title supplier price imageUrl"
      );

      return res.status(200).json(cart);
    } catch (error) {
     return res
       .status(500)
       .json({ error: error.message, message: "Failed to get product" });
    }
  },
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
