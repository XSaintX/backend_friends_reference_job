var cors = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(cors());

require('dotenv').config();

var references = require('./routes/references');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/references', references);

app.listen(process.env.PORT || 3000, function () {
    console.log('application listening on port ', process.env.PORT || 3000);
});
