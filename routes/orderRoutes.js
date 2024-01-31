const router = require("express").Router();
const oderController = require("../controllers/orderController");

router.get("/:id", oderController.getUserOrders);

module.exports = router;
