require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));




//mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
//mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true, useCreateIndex: true },
mongoose.connect('mongodb+srv://usertfu:BFiF8xVpQecnjVfE@cluster0-sgm4y.mongodb.net/cafe?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;

        console.log('Base de datos en línea');
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});