const fs = require('fs');
export default function writeFileToJSON(file, data) {
    return fs.writeFileSync(file, JSON.stringify(data));
};