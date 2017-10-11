const PORT = process.env.PORT || 8080;

const express = require('express');
const formidable = require('express-formidable');
const app = express();
const version = require('./package.json').version;
const semver = require('semver');
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(formidable());
app.enable('trust proxy');

require('./server-update')(app);
require('./server-crash')(app);

app.get('/', function (req, res) {
  res.status(200).send(`v${version}`);
});

app.listen(PORT, function () {
  console.log('server started on port: ' + PORT);
});
