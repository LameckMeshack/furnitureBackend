const router = require("express").Router();

const productController = require("../controllers/productsController");

//get
router.get("/", productController.getAllProducts);
//post
router.post("/", productController.createProduct);
//get
router.get("/:id", productController.getProduct);
//search
router.get("/search/:key", productController.searchProduct);

module.exports = router;
