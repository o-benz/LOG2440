const fs = require("fs/promises");

class FileManager {
    constructor(path) {
        this.path = path;
    }

    async readFile() {
        return await fs.readFile(this.path, { encoding: "utf-8" });
    }

    async writeFile(content) {
        await fs.writeFile(this.path, content);
    }
}

module.exports = { FileManager };
