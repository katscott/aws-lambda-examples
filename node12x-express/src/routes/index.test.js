const request = require("supertest");
const express = require("express");

const routes = require("./index");

describe("Default routes", () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use("/", routes);
    });

    it("GET /foo returns 404", async () => {
        await request(app)
            .get("/foo")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404, {
                message: "Not found"
            });
    });
});
