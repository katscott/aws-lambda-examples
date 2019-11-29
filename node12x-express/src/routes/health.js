var router = require("express").Router();

router.use("/", function(req, res, next) {
    return res.status(200).send("OK");
});

module.exports = router;
