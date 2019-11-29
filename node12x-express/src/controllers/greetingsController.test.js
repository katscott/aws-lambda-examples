const greetingsController = require("./greetingsController");

const mockRequest = name => {
    return {
        params: {
            name: name
        }
    };
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("greetingsController", () => {
    it("returns Greetings!", () => {
        const req = mockRequest();
        const res = mockResponse();

        const actual = greetingsController.get(req, res);

        expect(actual.status).toHaveBeenCalledWith(200);
        expect(actual.json).toHaveBeenCalledWith({ message: "Greetings!" });
    });

    it("returns custom Greetings!", () => {
        const testName = "Ford Prefect";

        const req = mockRequest(testName);
        const res = mockResponse();

        const actual = greetingsController.get(req, res);

        expect(actual.status).toHaveBeenCalledWith(200);
        expect(actual.json).toHaveBeenCalledWith({
            message: `Greetings ${testName}!`
        });
    });
});
