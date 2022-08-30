const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
const BaseRouter = require('./router/BaseRouter');



// Middleware and config
app.use(express.json());
mongoose.connect('mongodb://localhost:27017')
    .then((e) => { console.log("Connected to DB...") })
    .catch((err) => { console.error(err) })
app.use('/', BaseRouter);

// Listen
app.listen(process.env.PORT, () => {
    console.log("Server Stared..")
})