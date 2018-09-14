import removeEmptyIndicatorFiles from './removeEmptyIndicatorFiles';
import copyRecursiveSync from './copyRecursiveSync';
import writeFileJson from './writeFileJson';
import readFileJson from './readFileJson';
import removeFiles from './removeFiles';

const io = {
    removeEmptyIndicatorFiles,
    copyRecursiveSync,
    readFileJson,
    writeFileJson,
    removeFiles
};

export default io;