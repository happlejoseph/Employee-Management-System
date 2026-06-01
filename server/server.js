

const http = require('http');  // create server
const url = require('url');    // get pathname
const fs = require('fs');      // read files
const {mongoClient, MongoClient} = require('mongodb'); // connect MongoDB

const port = 3001;

const client = new MongoClient();

const app = http.createServer((req,res)=> {

    const {pathname} = url.parse(req.url);
    if(pathname === '/') {
        res.writeHead(200, {'content-type':'text/html'})
        res.end(fs.)
    }

})