

const http = require('http');  // create server
const url = require('url');    // get pathname
const fs = require('fs');      // read files
const queryString = require('querystring'); // import queryString

const {MongoClient, ObjectId} = require('mongodb'); // connect MongoDB

const port = 3002;

const client = new MongoClient('mongodb://127.0.0.1:27017/');
// await client.connect();

// create database //
const db = client.db('EmployeeManagement');

// create collection //
const collection = db.collection('employees');
// fot contacts //
const contactCollection = db.collection('contacts');

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

    else if(pathname === '/contact') {
        res.writeHead(200, {"content-type":'text/html'});
        res.end(fs.readFileSync('../client/pages/contact.html'));
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
        // console.log('form submited');

        let body = "";

        req.on('data',(chunks)=> {
            // console.log(chunks);
            body += chunks.toString()
            // console.log(body); 
        });

        req.on('end', async ()=> {
            const formData = queryString.parse(body);
            // console.log(formData);

            // collection.insertOne(formData)
            // .then(()=> {

            // })
            // .catch((err)=> {
            //     console.log(err);
                
            // })

            try {
                await collection.insertOne(formData);
                // console.log('inserted:', result);
                
            }
            catch(err) {
                // console.log('mongo erroe:', err);
                
            }
        });

        res.writeHead(201, {"content-type":'text/html'});
        res.end(fs.readFileSync('../client/index.html'));
    }


    // contact form submit //
    if(pathname === '/contactSubmit' && req.method === 'POST') {
        // console.log('contact form submited');

        let body = "";
        
        req.on('data',(chunks)=> {
            body += chunks.toString();
        });

        req.on('end',()=> {
            const formData = queryString.parse(body);
            // console.log(formData);

            contactCollection.insertOne(formData)
            .then(()=> {

            })
            .catch((err)=> {
                console.log(err);
                
            })
            
        });
    }

    // fetch employee //
    if(pathname === '/getEmployees' && req.method === 'GET') {
        
        const data = await collection.find().toArray();

        // console.log(data);

        res.writeHead(200, {"content-type":'application/json'});
        
        res.end(JSON.stringify(data));
        
    }

    // edit //
    if(pathname === '/editEmployee' && req.method === 'GET') {
        res.writeHead(200, {"content-type":'text/html'});
        res.end(fs.readFileSync('../client/pages/editEmployee.html'));
    }
    

})

app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
    
})