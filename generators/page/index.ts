import BaseGenerator from '../../src/generator/BaseGenerator';
import * as path from 'path';
import request from '../../src/utils/request';
import validation from '../../src/utils/validation';
import io from '../../src/utils/io';
import { downloadAndGenerate } from '../../src/utils/down/down';

class PageGenerator extends BaseGenerator {

    public constructor(args, opts) {
        super(args, opts);
    }

    public prompting() {
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
                validate: (input: string): string | boolean => {
                    if (!input || !input.length) {
                        return true;
                    }
                    if (validation.isFileNameExcessLimit(input)) {
                        return '项目名称超过限制';
                    }
                    if (validation.isFileNameValid((input))) {
                        return '文件命名不能包含\/:*?<>|';
                    }
                    validation.isFileNameStat('angular.json');
                    let angular = io.readFileJson('angular.json');
                    if ((Object.keys(angular.projects) as any).includes(input)) {
                        return '文件名重复,请重新输入';
                    }
                    return true;
                }
            } as object
            
        ]).then((answers) => {
            this.answers = answers;
        });
    }

    public async writing() {
        const {answers} = this;
        if (answers.template == 'angular') {
            this.createAngularPage();
        }
    }
    async createAngularPage() {
        const {answers} = this;
        const name = answers.appName;
        const rootDir = path.join(__dirname,'default');
        const template = 'http://192.168.1.122:3000:erp-front-project/bang-template';
        await downloadAndGenerate(template,rootDir);
        let tscon = io.readFileJson(rootDir + '/src/tsconfig.app.json');
        tscon.compilerOptions.baseUrl = `../${name}/`;
        io.writeFileJson(`${rootDir}/src/tsconfig.app.json`, tscon);
        let newData = io.readFileJson(path.join(__dirname,'default/angular.json'));
        let objData = io.readFileJson('angular.json');
        let strData = JSON.stringify(newData.projects)
        .replace(/src/g, name)
        .replace(/bang-ng-template-v6/g, name)
        .replace(new RegExp('ng-zorro-antd/'+ name, 'g'), 'ng-zorro-antd/src');
        let parseToObj = JSON.parse(strData);
        objData.projects[name] = parseToObj[name];
        objData.projects[name + '-e2e'] = parseToObj[name + '-e2e'];
        objData.defaultProject = name;
        io.writeFileJson(`angular.json`, objData);
        const sourceTemplate = path.resolve(__dirname, './default/src');
        const destinationTemplate = this.destinationPath(name);
        this.fs.copyTpl(sourceTemplate, destinationTemplate, {appName: name});
        setTimeout(() => {
            io.removeFiles(path.resolve(__dirname, './default'));
        }, 1000);
    }
    public install() {
        // super._install();
    }

    public end() {
        super._end();
        this.log('创建完成!')
    }
}

export = PageGenerator;