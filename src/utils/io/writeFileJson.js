"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
function writeFileToJSON(file, data) {
    return fs.writeFileSync(file, JSON.stringify(data));
}
exports.default = writeFileToJSON;
;
