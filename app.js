const os = require('os');
const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;
const interfaces = os.networkInterfaces();
let ipAddress;

Object.keys(interfaces).forEach((iface) => {
  interfaces[iface].forEach((ifaceDetails) => {
    if (ifaceDetails.family === 'IPv4' && !ifaceDetails.internal) {
      ipAddress = ifaceDetails.address;
    }
  });
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write(`Hello, World!\n`);
  res.write(`You are running on server: ${os.hostname()}\n`);
  res.write(`Your IP address is: ${ipAddress}\n`);
  res.write(`Your public IP address is: ${req.socket.remoteAddress}\n`);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});