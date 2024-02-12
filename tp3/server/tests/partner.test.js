const server = require("../server");
const supertest = require("supertest");
const request = supertest(server);
const { HTTP_STATUS } = require("../utils/http");

const partnerManager = require("../routes/partner").partnerManager;
const middlewareLogManager = require("../middlewares/requestLogger").logsManager;

const API_URL = "/api/partner";

describe("Partner API test", () => {
    const MOCK_DATA = [
        {
          "id": "433560e4-62b9-481b-8135-da9bb9d68102",
          "firstName": "Katie",
          "lastName": "Bell",
          "school": "Poudlard",
          "program": "Magie"
        },
        {
          "id": "a7c5b6d8-9e5f-4c3a-8f1c-6d7b8e9f0a1b",
          "firstName": "Bad Partner : No School",
          "lastName": "Paris",
          "program": "Astrophysique"
        },
        {
          "id": "b8d9e0f1-2a3b-4c5d-6e7f-8g9h0i1j2k3l",
          "firstName": "Henry",
          "lastName": "McCoy",
          "school": "École Xavier pour jeunes surdoués",
          "program": "Mathématiques"
        }
      ];

    beforeEach(() => {
        // Empécher la mise à jour des fichiers JSON
        jest.spyOn(middlewareLogManager, "writeLog").mockImplementation(() => { });
        jest.spyOn(partnerManager.fileManager, "writeFile").mockImplementation(() => { });
    });

    afterEach(async () => {
        jest.clearAllMocks();
        server.close();
    });

    it("GET request to /api/partner should return all partners and 200", async () => {
        jest.spyOn(partnerManager, "getPartners").mockImplementation(() => Promise.resolve(MOCK_DATA));
        const response = await request.get(API_URL);
        expect(response.status).toBe(HTTP_STATUS.SUCCESS);
        expect(response.body).toEqual(MOCK_DATA);
    });

    it("GET request to /api/partner should return no partners and 204 if there are no partners", async () => {
        jest.spyOn(partnerManager, "getPartners").mockImplementation(() => Promise.resolve([]));
        const response = await request.get(API_URL);
        expect(response.status).toBe(HTTP_STATUS.NO_CONTENT);
    });

    it("GET request to /api/partner/:id should return specific partner", async () => {
      jest.spyOn(partnerManager, "getPartners").mockImplementation(() => Promise.resolve(MOCK_DATA));
      const response = await request.get(`${API_URL}/${MOCK_DATA[0].id}`);
      expect(response.status).toBe(HTTP_STATUS.SUCCESS);
      expect(response.body).toEqual(MOCK_DATA[0]);
    });

    // Note : la méthode HTTP utilisée dans votre implémentation peut différer
    it("POST request to /api/partner should create a new partner", async () => {
        jest.spyOn(partnerManager, "addPartner").mockImplementation(() => Promise.resolve(MOCK_DATA[0]));
        const response = await request.post(`${API_URL}`).send(MOCK_DATA[0]);
        expect(response.status).toBe(HTTP_STATUS.CREATED);
        expect(response.body).toEqual(MOCK_DATA[0]);
    });

    it("POST request to /api/partner with missing data should return HTTP 400", async () => {
        jest.spyOn(partnerManager, "addPartner").mockImplementation(() => { });
        const badReview = { ...MOCK_DATA[1] }; // pas de champ school
        const response = await request.post(`${API_URL}`).send(badReview);
        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    });
});
