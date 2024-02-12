class LogsManager {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }

    async getLogs() {
        const logs = await this.fileManager.readFile();

        return JSON.parse(logs);
    }

    async writeLog(message) {
        const logs = await this.getLogs();

        await this.fileManager.writeFile(JSON.stringify([...logs, message], null, 2));
    }
}

module.exports = { LogsManager };
