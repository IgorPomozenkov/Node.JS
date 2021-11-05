const colors = require("colors");
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const inquirer = require('inquirer');

const options = yargs
    .usage('Usage: -s <enter search string>')
    .option('s', {
        alias: 'search',
        describe: 'Enter search string',
        type: 'string',
        demandOption: false,
    }).argv;

let dirname = __dirname;
let list = fs.readdirSync(dirname);
const isFile = fileName => fs.lstatSync(fileName).isFile();

const reader = () => {

    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list',
            message: 'Choose a file to read',
            choices: list,
        },
    ])
        .then(({ fileName }) => {
            if(!isFile(`${dirname}/${fileName}`)) {
                dirname += path.join('/', fileName);
                list = fs.readdirSync(dirname);
                reader();
            }else {
                const fullPath = path.join(dirname, fileName);
                fs.readFile(fullPath, 'utf-8', (err, data) => {
                    if (err) console.log(err);
                    if (!err) console.log(data);
                    if(options.s) {
                        if(data.includes(options.s)) console.log('Совпадение найдено'.green);
                        if(!data.includes(options.s)) console.log('Совпадение не найдено'.red);
                    }
                });
            }
        })
        .catch(err => console.log(err));
}

reader();