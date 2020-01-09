const url = require('url');
var querystring = require('querystring');
var https = require('https');
var token = "pk_d35e069d5bfd47b6badeaa3eb55675e3";
var host = "cloud.iexapis.com";

const fs = require('fs');
var headers = {
    'Content-Type': 'application/json'
};
var options = {
    host: host,
    headers: headers
};

const common = require('./common.js');

exports.symbolInfoRequest = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    var unknowSymbol=false;
    var method = req.method;
    var responseString = {};
    options.method = method;
    options.path = '/stable/stock/' + reqUrl.query.symbol + '/quote/?token=pk_d35e069d5bfd47b6badeaa3eb55675e3';


    //Quote request
    console.log('On service.js');
    console.log ('path ' + options.path);

    var httpReqLatestPrice = https.request(options, function (httpRes) {
        httpRes.setEncoding('utf-8');

        httpRes.on('data', function (data) {
            try {
                dataObject = JSON.parse(data);
                responseString.latestPrice = dataObject.latestPrice;
            } catch (error) {
                unknowSymbol=true;
            }

        });
        httpRes.on('end', function () {
            httpReqLogo.end();
        });
    });

    //Logo Request

    options.path = '/stable/stock/' + reqUrl.query.symbol + '/logo/?token=pk_d35e069d5bfd47b6badeaa3eb55675e3';
    var httpReqLogo = https.request(options, function (httpRes) {
        httpRes.setEncoding('utf-8');

        httpRes.on('data', function (data) {
            try {
                dataObject = JSON.parse(data);
                responseString.companyLogo = dataObject.url;
            } catch (error) {
                unknowSymbol=true;
            }

        });
        httpRes.on('end', function () {
            httpReqArticle.end();
        });
    });

    //News Request
    options.path = '/stable/stock/' + reqUrl.query.symbol + '/news/last/1/?token=pk_d35e069d5bfd47b6badeaa3eb55675e3';

    var httpReqArticle = https.request(options, function (httpRes) {
        httpRes.setEncoding('utf-8');
        httpRes.on('data', function (data) {
            try {
                dataObject = JSON.parse((data));
                responseString.articleUrl = dataObject[0].url;
            } catch (error) {
                unknowSymbol=true;
            }

        });
        httpRes.on('end', function () {
            if(unknowSymbol==true){
                res.statusCode = 204;
                common.writeLogs(reqUrl,204);
                res.end();
            }else{
                res.statusCode = 200;
                common.writeLogs(reqUrl,200);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(responseString));
            }

        });
    });

    httpReqLatestPrice.end();
};


/*function writeLogs(reqUrl,status){
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
        console.log("File was saved.");
    });
}*/