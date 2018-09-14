"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isFileNameValid_1 = require("./isFileNameValid");
const isFileNameExcessLimit_1 = require("./isFileNameExcessLimit");
const isFileNameStat_1 = require("./isFileNameStat");
const validation = {
    isFileNameValid: isFileNameValid_1.default,
    isFileNameExcessLimit: isFileNameExcessLimit_1.default,
    isFileNameStat: isFileNameStat_1.default
};
exports.default = validation;
