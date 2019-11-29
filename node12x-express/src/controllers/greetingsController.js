class GreetingsController {
    static get(req, res) {
        const name = req.params.name;
        return res.status(200).json({
            message: `Greetings${name ? " " + name : ""}!`
        });
    }
}

module.exports = GreetingsController;
