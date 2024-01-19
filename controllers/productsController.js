const Product = require("../models/Products");

module.exports = {
  //create a product
  createProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      return res.status(201).json("Product created successfully");
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to create the product",
      });
    }
  },

  //get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      return res.status(200).json(products);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message, message: "Failed to get all products" });
    }
  },

  //get a product
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      return res.status(200).json(product);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message, message: "Failed to get product" });
    }
  },

  searchProduct: async (req, res) => {
    try {
      const result = await Product.aggregate([
        {
          $search: {
            index: "furniture",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message, message: "Failed to get product" });
    }
  },
};
