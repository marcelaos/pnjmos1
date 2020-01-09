// Set parameters
const host = '127.0.0.1';
const portNumber = 3000;
const server = require('./controller.js');

// Start the server on port 3000
server.listen(portNumber, host, () => {
    console.log('Server running at http://%s:%d', host,portNumber);
});

