const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const router = require('./router');

var cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('client'));
app.use(cors())



router.set(app);

app.listen(config.port, () => console.log('El mejor API en el Puerto ' + config.port));