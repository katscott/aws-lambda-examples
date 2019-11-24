var router = require("express").Router();

router.use("/api/greet", require("./greet"));

router.use(function(req, res, next) {
    return res.status(404).json({
        message: "Not found"
    });
});

module.exports = router;
