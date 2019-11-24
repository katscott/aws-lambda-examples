const request = require("supertest");
const express = require("express");

const routes = require("./index");

describe("Greet routes", () => {
    const basePath = "/api/greet";
    let app;

    beforeAll(() => {
        app = express();
        app.use("/", routes);
    });

    it(`GET ${basePath} returns 200`, async () => {
        await request(app)
            .get(basePath)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);
    });

    it(`GET ${basePath}/{name} returns 200`, async () => {
        const testName = "Trillian";
        await request(app)
            .get(`${basePath}/${testName}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});
