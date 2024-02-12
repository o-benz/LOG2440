const server = require("../server");
const supertest = require("supertest");
const request = supertest(server);
const { HTTP_STATUS } = require("../utils/http");

const logsManager = require("../routes/logs").logsManager;
const middlewareLogManager = require("../middlewares/requestLogger").logsManager;

const API_URL = "/logs";

describe("Logs API test", () => {
    const MOCK_DATA = [
        "10/19/2023, 9:58:39 PM - GET - /api/partner",
        "10/19/2023, 9:58:51 PM - POST - /api/partner",
        "10/19/2023, 9:58:52 PM - GET - /api/partner",
        "10/19/2023, 9:58:55 PM - GET - /api/partner/0a445d67-43ea-43cf-91ae-4b3c131234b4",
        "10/19/2023, 9:58:55 PM - GET - /api/review/0a445d67-43ea-43cf-91ae-4b3c131234b4"
    ];

    beforeEach(() => {
    })

    afterEach(async () => {
        jest.clearAllMocks();
        server.close();
    });

    it("GET request to /logs should return data logs and 200", async () => {
        jest.spyOn(middlewareLogManager, "writeLog").mockImplementation(() => { });
        jest.spyOn(logsManager, "getLogs").mockImplementation(() => Promise.resolve(MOCK_DATA));
        jest.spyOn(logsManager, "writeLog").mockImplementation(() => { });
        const response = await request.get(API_URL);
        expect(response.status).toBe(HTTP_STATUS.SUCCESS);
        expect(response.body).toEqual(MOCK_DATA);
    });

    it("GET request to /logs should return 204 if no logs are available", async () => {
        jest.spyOn(middlewareLogManager, "writeLog").mockImplementation(() => { });
        jest.spyOn(logsManager, "getLogs").mockImplementation(() => Promise.resolve([]));
        jest.spyOn(logsManager, "writeLog").mockImplementation(() => { });
        const response = await request.get(API_URL);
        expect(response.status).toBe(HTTP_STATUS.NO_CONTENT);
    });

    it("GET request to /logs should return 500 on a server error", async () => {
        const error = "Test Error";
        jest.spyOn(middlewareLogManager, "writeLog").mockImplementation(() => { });
        jest.spyOn(logsManager, "getLogs").mockImplementation(() => Promise.reject(error));
        jest.spyOn(logsManager, "writeLog").mockImplementation(() => { });
        const response = await request.get(API_URL);
        expect(response.status).toBe(HTTP_STATUS.SERVER_ERROR);
        expect(response.body).toBe(error);
    });

    it("Any request to server should call writeLog", async () => {
        const writeLogSpy = jest.spyOn(middlewareLogManager, "writeLog").mockImplementation(() => { });
        await request.get("/api/review");
        expect(writeLogSpy).toHaveBeenCalled();
    });
});
