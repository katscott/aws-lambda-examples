exports.handler = function(event, context) {
    const name = event.name || "";

    if (name === "") {
        context.succeed("Greetings!");
    }

    context.succeed(`Greetings ${name}!`);
};
