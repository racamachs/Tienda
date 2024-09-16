"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const port = process.env.PORT || 4201;

main().catch(err => console.log(err));

async function main() {
    const mongoURI = 'mongodb://127.0.0.1:27017/tienda';
    await mongoose.connect(mongoURI)

    console.log('Mongo connected');
}
const clienteRoutes = require("./routes/cliente");

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',clienteRoutes);


module.exports = app;
