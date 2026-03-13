const http = require('http');
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const port = 4173;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};
function send(res, code, body, type) {
  res.writeHead(code, { 'Content-Type': type });
  res.end(body);
}
function resolvePath(urlPath) {
  const clean = decodeURIComponent((urlPath || '/').split('?')[0]);
  let filePath = path.join(root, clean);
  if (clean.endsWith('/')) {
    filePath = path.join(root, clean, 'index.html');
  }
  if (!path.extname(filePath)) {
    const asDir = path.join(root, clean, 'index.html');
    if (fs.existsSync(asDir)) return asDir;
    const asHtml = path.join(root, `${clean}.html`);
    if (fs.existsSync(asHtml)) return asHtml;
  }
  return filePath;
}
http.createServer((req, res) => {
  const target = resolvePath(req.url);
  fs.readFile(target, (err, data) => {
    if (err) {
      fs.readFile(path.join(root, '404.html'), (notFoundErr, notFoundData) => {
        if (notFoundErr) {
          send(res, 404, 'Not Found', 'text/plain; charset=utf-8');
          return;
        }
        send(res, 404, notFoundData, 'text/html; charset=utf-8');
      });
      return;
    }
    const ext = path.extname(target).toLowerCase();
    send(res, 200, data, types[ext] || 'application/octet-stream');
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`kc135 preview running at http://127.0.0.1:${port}`);
});
