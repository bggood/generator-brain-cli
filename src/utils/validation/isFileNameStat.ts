const fs = require('fs');
import * as path from 'path';
export default function isFileNameStat(file: string) {
    fs.stat(file, (err) => {
        if (err) {
            console.log('不存在angular.json');
            throw err;
        }; 
    });
}