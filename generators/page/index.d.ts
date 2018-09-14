import BaseGenerator from '../../src/generator/BaseGenerator';
declare class PageGenerator extends BaseGenerator {
    constructor(args: any, opts: any);
    prompting(): Promise<void>;
    writing(): Promise<void>;
    createAngularPage(): Promise<void>;
    install(): void;
    end(): void;
}
export = PageGenerator;
