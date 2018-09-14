import isFileNameValid from './isFileNameValid';
import isFileNameExcessLimit from './isFileNameExcessLimit';
import isFileNameStat from './isFileNameStat';
declare const validation: {
    isFileNameValid: typeof isFileNameValid;
    isFileNameExcessLimit: typeof isFileNameExcessLimit;
    isFileNameStat: typeof isFileNameStat;
};
export default validation;
