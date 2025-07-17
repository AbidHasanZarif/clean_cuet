const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello from minimal server');
});

server.listen(5000, '0.0.0.0', () => {
  console.log('Minimal server running on port 5000');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});