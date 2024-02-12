const path = require("path");
const { HTTP_STATUS } = require("../utils/http");
const { FileManager } = require("../managers/fileManager");
const { LogsManager } = require("../managers/logsManager");

const router = require("express").Router();

const logsManager = new LogsManager(new FileManager(path.join(__dirname + "/../data/logs.json")));

router.get("/", async (request, response) => {
    try {
        const logs = await logsManager.getLogs();

        if (logs.length !== 0) {
            response.status(HTTP_STATUS.SUCCESS).json(logs);
        } else {
            response.status(HTTP_STATUS.NO_CONTENT).send();
        }
    } catch (error) {
        console.log(error);
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

module.exports = { router, logsManager };
