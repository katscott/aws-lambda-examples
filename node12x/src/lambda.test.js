const lambda_tester = require("lambda-tester");
const lambda = require("./lambda");

describe("lambda.handler", () => {
    it("returns Greetings!", function() {
        return lambda_tester(lambda.handler)
            .event({})
            .expectSucceed(result => {
                expect(result).toBe("Greetings!");
            });
    });

    it("returns custom Greetings!", function() {
        const testName = "Zaphod Beeblebrox";
        return lambda_tester(lambda.handler)
            .event({ name: testName })
            .expectSucceed(result => {
                expect(result).toBe(`Greetings ${testName}!`);
            });
    });
});
