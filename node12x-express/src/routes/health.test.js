const request = require("supertest");
const express = require("express");

const routes = require("./health");

describe("Health routes", () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use("/", routes);
    });

    it("GET / returns OK", async () => {
        await request(app)
            .get("/")
            .expect("Content-Type", /html/)
            .expect(200, "OK");
    });
});
