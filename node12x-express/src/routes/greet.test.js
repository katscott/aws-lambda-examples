const request = require("supertest");
const express = require("express");

const routes = require("./greet");

describe("Greet routes", () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use("/", routes);
    });

    it(`GET / returns 200`, async () => {
        await request(app)
            .get("/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);
    });

    it(`GET /{name} returns 200`, async () => {
        const testName = "Trillian";
        await request(app)
            .get(`/${testName}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});
