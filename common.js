const http = require('http');
const url = require('url');
const fs = require('fs');

exports.writeLogs = function (reqUrl, status) {
    var d = new Date;
    var dformat = [d.getMonth()+1,
            d.getDate(),
            d.getFullYear()].join('/')+' '+
        [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');

    var log="Path: "+reqUrl.path+", Request time: "+dformat+", Response status:"+status+"\n";

    fs.appendFile("log1.txt", log, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved.");
    });
}
