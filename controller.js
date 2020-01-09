const http = require('http');
const url = require('url');
const fs = require('fs');

module.exports = http.createServer((req, res) => {

    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);
    const common = require('./common.js');

    // GET Endpoint
    if (reqUrl.pathname == '/symbol/' && req.method == 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);
        service.symbolInfoRequest(req, res);
    }else{
        common.writeLogs(reqUrl,404)
    }

});

