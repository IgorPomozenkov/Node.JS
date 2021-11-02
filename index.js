const colors = require("colors");
const fs = require('fs');
//const { Transform } = require('stream');
const readline = require('readline');

const ACCESS_LOG = './src/logs/access.log';
const REQUESTS_LOG_1 = './src/logs/34.48.240.111_requests.log';
const REQUESTS_LOG_2 = './src/logs/89.123.1.41_requests.log';

const readStream = fs.createReadStream(ACCESS_LOG, { encoding: 'utf-8', });
const writeStream1 = fs.createWriteStream(REQUESTS_LOG_1, { encoding: 'utf-8', flags: 'a', });
const writeStream2 = fs.createWriteStream(REQUESTS_LOG_2, { encoding: 'utf-8', flags: 'a', });

const rl = readline.createInterface({
    input: readStream,
    terminal: true,
});

const regexp1 = /34.48.240.111/;
const regexp2 = /89.123.1.41/;

rl.on('line', (line) => {
    if(regexp1.test(line)) writeStream1.write(line + '\n');

    if(regexp2.test(line)) writeStream2.write(line + '\n');

    // if(regexp1.test(line)) console.log(line.green);
    // if(regexp2.test(line)) console.log(line.blue);
});

rl.on('close', () => {
    console.log('Write stream finished'.yellow);
});