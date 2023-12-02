"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    // res.writeHead(200, {'Context-Type': 'text/html'});
    // res.write('<h1>Hola mundo!</h1>')
    // res.end();
    var _a, _b;
    // const data = { name: 'Hola', age: 30, city: 'Lima' };
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end( JSON.stringify(data) );
    if (req.url === '/') {
        const htmlFile = fs_1.default.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }
    const responseContent = fs_1.default.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);
    // else {
    //     res.writeHead(404, { 'Content-Type': 'text/html' });
    //     res.end();
    // }
});
server.listen(3000, () => {
    console.log('Server running');
});
