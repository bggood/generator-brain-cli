"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BaseGenerator_1 = require("../../src/generator/BaseGenerator");
const path = require("path");
const validation_1 = require("../../src/utils/validation");
const io_1 = require("../../src/utils/io");
const down_1 = require("../../src/utils/down/down");
class PageGenerator extends BaseGenerator_1.default {
    constructor(args, opts) {
        super(args, opts);
    }
    prompting() {
        return this.prompt([
            {
                type: 'list',
                name: 'template',
                required: true,
                message: '请选择需要的项生成目',
                choices: ['angular'],
                default: 'angular'
            },
            {
                type: 'input',
                name: 'appName',
                required: true,
                message: '请输入项目名称',
                default: 'bang-ng-template',
                validate: (input) => {
                    if (!input || !input.length) {
                        return true;
                    }
                    if (validation_1.default.isFileNameExcessLimit(input)) {
                        return '项目名称超过限制';
                    }
                    if (validation_1.default.isFileNameValid((input))) {
                        return '文件命名不能包含\/:*?<>|';
                    }
                    validation_1.default.isFileNameStat('angular.json');
                    let angular = io_1.default.readFileJson('angular.json');
                    if (Object.keys(angular.projects).includes(input)) {
                        return '文件名重复,请重新输入';
                    }
                    return true;
                }
            }
        ]).then((answers) => {
            this.answers = answers;
        });
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const { answers } = this;
            if (answers.template == 'angular') {
                this.createAngularPage();
            }
        });
    }
    createAngularPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const { answers } = this;
            const name = answers.appName;
            const rootDir = path.join(__dirname, 'default');
            const template = 'http://192.168.1.122:3000:erp-front-project/bang-template';
            yield down_1.downloadAndGenerate(template, rootDir);
            let tscon = io_1.default.readFileJson(rootDir + '/src/tsconfig.app.json');
            tscon.compilerOptions.baseUrl = `../${name}/`;
            io_1.default.writeFileJson(`${rootDir}/src/tsconfig.app.json`, tscon);
            let newData = io_1.default.readFileJson(path.join(__dirname, 'default/angular.json'));
            let objData = io_1.default.readFileJson('angular.json');
            let strData = JSON.stringify(newData.projects)
                .replace(/src/g, name)
                .replace(/bang-ng-template-v6/g, name)
                .replace(new RegExp('ng-zorro-antd/' + name, 'g'), 'ng-zorro-antd/src');
            let parseToObj = JSON.parse(strData);
            objData.projects[name] = parseToObj[name];
            objData.projects[name + '-e2e'] = parseToObj[name + '-e2e'];
            objData.defaultProject = name;
            io_1.default.writeFileJson(`angular.json`, objData);
            const sourceTemplate = path.resolve(__dirname, './default/src');
            const destinationTemplate = this.destinationPath(name);
            this.fs.copyTpl(sourceTemplate, destinationTemplate, { appName: name });
            setTimeout(() => {
                io_1.default.removeFiles(path.resolve(__dirname, './default'));
            }, 1000);
        });
    }
    install() {
        // super._install();
    }
    end() {
        super._end();
        this.log('创建完成!');
    }
}
module.exports = PageGenerator;
