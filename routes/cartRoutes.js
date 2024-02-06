const router = require("express").Router();

const {verifyToken} = require("../middleware/verifyToken");

const cartController = require("../controllers/cartController");

router.get("/find", verifyToken, cartController.getCart);
router.post("/",verifyToken, cartController.addToCart);
router.post("/quantity", cartController.decrementCartItem);
router.delete("/:cartItemId", cartController.deleteCartItem);

module.exports = router;
