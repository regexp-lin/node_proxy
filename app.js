const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let proxy = require('./proxy');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', proxy());

let server = app.listen(9898, () =>{
    console.log(`started the server,the port is 9898`);
});
