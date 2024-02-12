const path = require("path");
const { FileManager } = require("../managers/fileManager");
const { LogsManager } = require("../managers/logsManager");

const logsManager = new LogsManager(new FileManager(path.join(__dirname + "/../data/logs.json")));

const requestLogger = async (req, res, next) => {
    try {
        const logMessage = `${new Date().toLocaleString()} - ${req.method} - ${req.path}`;
        await logsManager.writeLog(logMessage);
        next();
    } catch (error) {
        console.error(`Error while logging request ${error}`);
        next();
    }
}

module.exports = { requestLogger, logsManager };
