"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const removeEmptyIndicatorFiles_1 = require("./removeEmptyIndicatorFiles");
const copyRecursiveSync_1 = require("./copyRecursiveSync");
const writeFileJson_1 = require("./writeFileJson");
const readFileJson_1 = require("./readFileJson");
const removeFiles_1 = require("./removeFiles");
const io = {
    removeEmptyIndicatorFiles: removeEmptyIndicatorFiles_1.default,
    copyRecursiveSync: copyRecursiveSync_1.default,
    readFileJson: readFileJson_1.default,
    writeFileJson: writeFileJson_1.default,
    removeFiles: removeFiles_1.default
};
exports.default = io;
