const next = require('next');

const { createServer } = require('http');
const { parse } = require('url');

const PORT = +process.env.FRONTEND_PORT || 3000;

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        createServer((req, res) => {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl).catch(console.error);
        }).listen(PORT);
    })
    .catch(console.error);
