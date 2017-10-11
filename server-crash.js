const request = require('request-promise-native');

module.exports = function (app) {

  app.post('/', function (req, res) {

    if (req.fields.prod != 'Electron') {
      res.statusCode = 400;
      return res.end();
    }

    var form = {};
    form.version = req.fields.version;
    form.host = req.fields.host;
    form.short_message = req.fields.short_message;
    form._userID = req.fields._userID;
    form._platform = req.fields._platform;
    form._appVersion = req.fields._appVersion;
    form._env = parseInt(req.fields._env);
    form._guid = req.fields.guid;
    form._prod = req.fields.prod;
    form._electronVersion = req.fields.ver;
    form._processType = req.fields.process_type;
    form._nodeVersion = req.fields._nodeVersion;
    form._session = req.fields._session;
    form.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const options = {
      url: 'https://metrics.phonegap.com/gelfproxypass',
      body: JSON.stringify(form)
    }

    request.post(options)
      .then(body => {
          res.statusCode = 200;
          console.log('*** post success: ' + JSON.stringify(form));
      })
      .catch(err => {
        res.statusCode = err.statusCode || 400;
        res.statusMessage = err.statusMessage || 'Bad Request';
        console.log('*** post error: ' + err.message);
      })
      .then(() => res.end());
  });
}