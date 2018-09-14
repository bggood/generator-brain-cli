"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
function isFileNameStat(file) {
    fs.stat(file, (err) => {
        if (err) {
            console.log('不存在angular.json');
            throw err;
        }
        ;
    });
}
exports.default = isFileNameStat;
