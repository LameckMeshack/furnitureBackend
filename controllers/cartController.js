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
    const cartItemId = req.params.cartItemId;
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { "products._id": cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );

      if (!updatedCart) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      return res.status(500).json(updatedCart);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message, message: "Failed to delete cart item" });
    }
  },
  decrementCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
      const cart = Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === cartItem
      );

      if (!existingProduct) {
        return res.status(404).json("Product not found");
      }

      if (existingProduct.quantity === 1) {
        cart.products = cart.products.filter(
          (product) => product.cartItem.toString() !== cartItem
        );
      } else {
        existingProduct.quantity -= 1;
      }

      await cart.save();

      if (existingProduct.quantity === 0) {
        await Cart.updateOne({ userId }, { $pull: { products: { cartItem } } });
      }

      return res.status(200).json("Product updated successfully");
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message, message: "Failed to decrement product" });
    }
  },
};
