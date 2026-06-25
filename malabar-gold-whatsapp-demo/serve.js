/*
 * Tiny zero-dependency static file server for the browser demo.
 * Run:  node serve.js     →  http://localhost:5500
 * (The demo is fully static and also works by opening index.html directly in a browser.)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5500;
const ROOT = __dirname;
const TYPES = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.ico':'image/x-icon', '.md':'text/markdown' };

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
}).listen(PORT, () => console.log(`Maya demo at  http://localhost:${PORT}`));
