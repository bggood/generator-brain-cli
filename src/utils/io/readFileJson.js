"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
function readFileToJSON(file) {
    let data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
}
exports.default = readFileToJSON;
;
