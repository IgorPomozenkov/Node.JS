const fs = require('fs');
const path = require('path');
const http = require('http');

const isFile = fileName => fs.lstatSync(fileName).isFile();

http.createServer((req, res) => {
	//console.log('url:', req.url);
	if(req.url !== '/favicon.ico') {
		const fullPath = path.join(__dirname, decodeURI(req.url));

		if(!fs.existsSync(fullPath)) {
			res.writeHead(200, 'OK', { "Content-Type": "text/html; charset=utf-8" });
			res.end('<h4>Не найден файл или директория!</h4>');
			return
		}

		if(isFile(fullPath)) {
			res.writeHead(200, 'OK', { "Content-Type": "text/plain; charset=utf-8" });
			fs.createReadStream(fullPath).pipe(res);
		}else {
			fs.readdir(fullPath, 'utf-8', (err, list) => {
				if(err) {
					console.log(err);
					res.end(err.toString());
				}else {
					res.writeHead(200, 'OK', { "Content-Type": "text/html; charset=utf-8" });
					res.write('<h4>Выберите нужную вам директорию или файл</h4>');
					list.forEach(el => {
						const pathLink = path.join(decodeURI(req.url), el);
						res.write(`<a href="${pathLink}">${el}</a><br><br>`);
					});
					res.end();
				}
			});
		}
	}

}).listen(5555, 'localhost');