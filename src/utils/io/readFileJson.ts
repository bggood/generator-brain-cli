const fs = require('fs');
export default function readFileToJSON(file) {
    let data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
};