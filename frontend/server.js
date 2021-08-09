const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const PORT = 4000;
const HOST = process.env.HOST || '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl).catch(error => {
            console.log(`Frontend server error: ${error}`);
        });
        process.on('SIGILL', signal => {
            console.log(`Frontend server error: ${signal}`);
        });
    }).listen(PORT, HOST, error => {
        if (error) {
            console.log(`Frontend server error: ${error}`);
            return;
        }
        console.log(`Front-end is run on port: ${PORT}, end host: ${HOST}`);
    });
});
