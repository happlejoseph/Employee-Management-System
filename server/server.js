

const http = require('http');  // create server
const url = require('url');    // get pathname
const fs = require('fs');      // read files
const queryString = require('querystring'); // import queryString

const {MongoClient} = require('mongodb'); // connect MongoDB

const port = 3001;

const client = new MongoClient('mongodb://127.0.0.1:27017/');
// await client.connect();

// create database //
const db = client.db('EmployeeManagement');

// create collection //
const collection = db.collection('employees');

const app = http.createServer(async(req,res)=> {

    const {pathname} = url.parse(req.url);
    console.log(pathname);
    

    if(pathname === '/') {
        res.writeHead(200, {"content-type":'text/html'});
        res.end(fs.readFileSync('../client/index.html'));
    }

    else if(pathname === '/about') {
        res.writeHead(200, {"content-type":'text/html'});
        res.end(fs.readFileSync('../client/pages/about.html'));
    }
    
    else if(pathname === '/addEmployee') {
        res.writeHead(200, {"content-type":'text/html'});
        res.end(fs.readFileSync('../client/pages/addEmployee.html'));
    }

    else if(pathname === '/client/style.css') {
        res.writeHead(200, {"content-type":'text/css'});
        res.end(fs.readFileSync('../client/style.css'));
    }

    else if(pathname === '/client/images/logo.png') {
        res.writeHead(200, {"content-type":'image/png'});
        res.end(fs.readFileSync('../client/images/logo.png'));
    }

    else if(pathname === '/client/js/index.js') {
        res.writeHead(200, {"content-type":'application/javascript'});
        res.end(fs.readFileSync('../client/js/index.js'));
    }

    // form submit //
    if(pathname === '/submit' && req.method === 'POST') {
        console.log('form submited');

        let body = ""
        req.on('data',(chunks)=> {
            // console.log(chunks);
            body += chunks.toString()
            // console.log(body); 
        });

        req.on('end',()=> {
            const formData = queryString.parse(body)
            // console.log(formData);
            
            // console.log(formData);
            collection.insertOne(formData)
            .then(()=> {

            })
            .catch((err)=> {
                console.log(err);
                
            })
        });

        res.writeHead(201, {"content-type":'text/html'});
        res.end(fs.readFileSync('../client/index.html'));
    }

    // fetch employee //
    if(pathname === '/getEmployees' && req.method === 'GET') {
        
        const data = await collection.find().toArray();

        // console.log(data);

        res.writeHead(200, {"content-type":'application/json'});
        
        res.end(JSON.stringify(data));
        
    }

    // edit //
    

})

app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
    
})