const debug_env = process.env.DEBUG;
const debug = debug_env ? debug_env.toLowerCase() === "true" : false;

exports.handler = function(event, context) {
    if (debug) {
        console.log(event);
    }

    const name = event.name || "";

    context.succeed({ message: `Greetings${name ? " " + name : ""}!` });
};
