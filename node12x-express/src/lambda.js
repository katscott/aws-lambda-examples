const awsServerlessExpress = require(process.env.NODE_ENV === "test"
    ? "../../index"
    : "aws-serverless-express");
const app = require("./app");

const server = awsServerlessExpress.createServer(app, null, []);

const debug_env = process.env.DEBUG;
const debug = debug_env ? debug_env.toLowerCase() === "true" : false;

exports.handler = (event, context) => {
    if (debug) {
        console.log(event);
    }
    awsServerlessExpress.proxy(server, event, context);
};
