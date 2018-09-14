import removeEmptyIndicatorFiles from './removeEmptyIndicatorFiles';
import copyRecursiveSync from './copyRecursiveSync';
import writeFileJson from './writeFileJson';
import readFileJson from './readFileJson';
import removeFiles from './removeFiles';
declare const io: {
    removeEmptyIndicatorFiles: typeof removeEmptyIndicatorFiles;
    copyRecursiveSync: typeof copyRecursiveSync;
    readFileJson: typeof readFileJson;
    writeFileJson: typeof writeFileJson;
    removeFiles: typeof removeFiles;
};
export default io;
