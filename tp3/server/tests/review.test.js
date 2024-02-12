const server = require("../server");
const supertest = require("supertest");
const request = supertest(server);
const { HTTP_STATUS } = require("../utils/http");

const reviewManager = require("../routes/review").reviewManager;
const middlewareLogManager = require("../middlewares/requestLogger").logsManager;

const API_URL = "/api/review";

describe("Reviews API test", () => {
    const MOCK_DATA = [
        {
            "rating": "1",
            "comment": "Test Comment 1",
            "author": "Test Author 1",
            "reviewedPartnerId": "433560e4-62b9-481b-8135-da9bb9d68102",
            "id": "430d0c52-8f5e-4e91-93a2-dc8ce614eb5e",
            "date": "2020-10-10",
            "likes": 7
        },
        {
            "rating": "1",
            "comment": "Invalid Review : no Author",
            "reviewedPartnerId": "533560e4-62b9-481b-8135-da9bb9d68102",
            "id": "530d0c51-8f5e-4e91-93a2-dc8ce614eb5e",
            "date": "2020-10-10",
            "likes": 2
        },
        {
            "rating": "1",
            "comment": "Test Comment 2",
            "author": "Test Author 2",
            "reviewedPartnerId": "433560e4-62b9-481b-8135-da9bb9d68102",
            "id": "530d0c51-8f5e-4e91-93a2-dc8ce614eb5e",
            "likes": 2
        }
    ];

    beforeEach(() => {
        // Empécher la mise à jour des fichiers JSON
        jest.spyOn(middlewareLogManager, "writeLog").mockImplementation(() => { });
        jest.spyOn(reviewManager.fileManager, "writeFile").mockImplementation(() => { });
    });

    afterEach(async () => {
        jest.clearAllMocks();
        server.close();
    });

    it("GET request to /api/review should return all reviews and 200", async () => {
        jest.spyOn(reviewManager, "getReviews").mockImplementation(() => Promise.resolve(MOCK_DATA));
        const response = await request.get(API_URL);
        expect(response.status).toBe(HTTP_STATUS.SUCCESS);
        expect(response.body).toEqual(MOCK_DATA);
    });

    it("GET request to /api/review should return 204 if there are no reviews", async () => {
        jest.spyOn(reviewManager, "getReviews").mockImplementation(() => []);
        const response = await request.get(API_URL);
        expect(response.status).toBe(HTTP_STATUS.NO_CONTENT);
    });

    it("GET request to /api/review should return 500 on server error", async () => {
        jest.spyOn(reviewManager, "getReviews").mockImplementation(() => Promise.reject("Test error!"));
        const response = await request.get(API_URL);
        expect(response.status).toBe(HTTP_STATUS.SERVER_ERROR);
    });

    it("GET request to /api/review/:id should return all reviews for the same partner", async () => {
        jest.spyOn(reviewManager, "getReviews").mockImplementation(() => Promise.resolve(MOCK_DATA));
        const response = await request.get(`${API_URL}/${MOCK_DATA[0].reviewedPartnerId}`);
        expect(response.status).toBe(HTTP_STATUS.SUCCESS);
        expect(response.body).toEqual([MOCK_DATA[0], MOCK_DATA[2]]);
    });

    it("GET request to /api/review/:id should return no reviews if partner is not evaluated", async () => {
        jest.spyOn(reviewManager, "getReviews").mockImplementation(() => Promise.resolve(MOCK_DATA));
        const response = await request.get(`${API_URL}/abcdef`);
        expect(response.status).toBe(HTTP_STATUS.NO_CONTENT);
    });

    // TODO : Ajouter des tests pour les autres routes

    it("POST request to /api/review should create a new review", async () => {
        jest.spyOn(reviewManager, "addReview").mockImplementation(() => Promise.resolve(MOCK_DATA[0]));
        const response = await request.post(`${API_URL}`).send(MOCK_DATA[0]);
        expect(response.status).toBe(HTTP_STATUS.CREATED);
        expect(response.body).toEqual(MOCK_DATA[0]);
    });
    it("POST request to /api/review with missing data should return HTTP 400", async () => {
        jest.spyOn(reviewManager, "addReview").mockImplementation(() => { });
        const badReview = { ...MOCK_DATA[1] }; 
        const response = await request.post(`${API_URL}`).send(badReview);
        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    });

    it("PATCH request to /api/review/:id/likes should increment the like count and return the updated review", async () => {
        jest.spyOn(reviewManager, "likeReview").mockImplementation(() => Promise.resolve(MOCK_DATA[0]));
        const response = await request.patch(`${API_URL}/${MOCK_DATA[0].id}/likes`);
        const updatedReview = await reviewManager.likeReview(MOCK_DATA[0].id);
        expect(response.status).toBe(HTTP_STATUS.SUCCESS);
        expect(response.body.likes).toBe(updatedReview.likes);
    });

    it("PATCH request to /api/review/:id/likes should return HTTP 404 if the review does not exist", async () => {
        jest.spyOn(reviewManager, "likeReview").mockImplementation(() => null);
        const response = await request.patch(`${API_URL}/non_existent_review_id/likes`);
        expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
    });

    it("DELETE request to /api/review/:id should delete a review and return 204", async () => {
        jest.spyOn(reviewManager, "deleteReviewsMatchingPredicate").mockImplementation(predicate => {
            const reviewToDelete = MOCK_DATA.find(review => review.id === MOCK_DATA[0].id);
            return predicate(reviewToDelete);
        });
        const response = await request.delete(`${API_URL}/${MOCK_DATA[0].id}`);
        expect(response.status).toBe(HTTP_STATUS.SUCCESS);
    });

    it("DELETE request to /api/review/:id should return HTTP 404 if the review does not exist", async () => {
        jest.spyOn(reviewManager, "deleteReviewsMatchingPredicate").mockImplementation(() => null);
        const response = await request.delete(`${API_URL}/non_existent_review_id}`);
        expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
    }); 
    
});
