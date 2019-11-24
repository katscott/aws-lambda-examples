const router = require("express").Router();
const greetingsController = require("../controllers/greetingsController");

router.get("/", greetingsController.get);
router.get("/:name", greetingsController.get);

module.exports = router;
