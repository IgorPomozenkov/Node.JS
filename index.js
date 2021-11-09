const fs = require('fs');
const path = require('path');
const http = require('http');

const isFile = fileName => fs.lstatSync(fileName).isFile();

http.createServer((req, res) => {
	//console.log('url:', req.url);
	if(req.url !== '/favicon.ico') {
		const fullPath = path.join(__dirname, req.url);

		if(isFile(fullPath)) {
			fs.createReadStream(fullPath).pipe(res);
		}else {
			fs.readdir(fullPath, 'utf-8', (err, list) => {
				if(err) {
					console.log(err);
					res.end(err.toString());
				}else {
					res.writeHead(200, 'OK', { "Content-Type": "text/plain; charset=utf-8" });
					res.write('Введите в адресную строку через "/" нужную вам директорию или файл! \n \n');
					list.forEach(el => {
						res.write(el + '\n');
					});
					res.end();
				}
			});
		}
	}

}).listen(5555, 'localhost');