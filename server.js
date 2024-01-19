const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=> {
	console.log(req.url);
	const body = req.url === '/style.css'
	? fs.readFileSync('./publick/style.css')
	: fs.readFileSync('./publick/index.html')
	res.end(body)
})

server.listen(3000);
console.log('Server started');