var router = require("express").Router();

const prefix = process.env.API_URL_PREFIX;

router.use(`/${prefix || "greet"}`, require("./greet"));
router.use("/health", require("./health"));

router.use(function(req, res, next) {
    return res.status(404).json({
        message: "Not found"
    });
});

module.exports = router;
