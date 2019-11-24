const awsServerlessExpress = require(process.env.NODE_ENV === "test"
    ? "../../index"
    : "aws-serverless-express");
const app = require("./app");

const server = awsServerlessExpress.createServer(app, null, []);

exports.handler = (event, context) =>
    awsServerlessExpress.proxy(server, event, context);
