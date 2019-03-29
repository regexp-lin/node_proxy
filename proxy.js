const http = require('http');
const querystring = require('querystring');
const request = require('request');

//获取请求的cookie和query等
let getHeader = (reqClient) => {
    let headers = reqClient.headers;
    headers.path = reqClient.path;
    headers.query = reqClient.query;
    headers.cookie = reqClient.get('cookie') || '';

    return headers;
}

//代理函数，options是代理设置，包括目标服务器ip，port等
let proxy = () => {
    let reqOptions = {};
    //返回请求处理函数，reqClient浏览器的请求，resClient是响应浏览器的对象
    return function (reqClient, resClient) {
        debugger; 
        //设置目标服务器的请求参数，头中的各项参数
        let headers = getHeader(reqClient);
        reqOptions.headers = reqClient.headers;
        let query = [];
        if (headers.query) {
            Object.keys(headers.query).map(key => {
                query.push(key + '=' + headers.query[key]);
            });
            reqOptions.path = headers.path + (query.length === 0 ? '' : ('?' + query.join('&')));

        }
        reqOptions.cookie = headers.cookie;
        reqOptions.method = reqClient.method;

        reqOptions.url = reqClient.originalUrl; 

        reqClient.pipe(request(reqOptions)).pipe(resClient);
    }
}

module.exports = proxy;