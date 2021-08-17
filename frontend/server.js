const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const PORT = process.env.FRONTEND_PORT || 4000;
const HOST = process.env.FRONTEND_HOST || '0.0.0.0';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
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
    })
    .catch(error => {
        console.log(`Frontend server error: ${error}`);
    });
