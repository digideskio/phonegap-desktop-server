const request = require('request-promise-native');
const semver = require('semver');

module.exports = function (app) {
  app.get('/desktop/:branch?', function (req, res) {
    const clientVersion = req.query.version;
    const platform = req.query.platform;
    const branch = req.params.branch || 'update-check';
    const jsonUrl = 'https://raw.githubusercontent.com/phonegap/phonegap-app-desktop/' + branch + '/package.json';
    var options = { url: jsonUrl, json: true, timeout: 5000 };

    request(options)
      .then(body => {
        var serverVersion = body.version;
        console.log('serverVersion: ' + serverVersion + ' clientVersion: ' + clientVersion + ' platform: ' + platform);

        if (semver.valid(clientVersion) && semver.gt(serverVersion, clientVersion)) {

          var downloadUrl = null;
          var updateJSON = null;

          if (platform === 'darwin') {
            downloadUrl = body.packages.mac.url;
          }
          if (platform === 'win32') {
            downloadUrl = body.packages.win.url;
          }

          if (downloadUrl) {
            res.writeHead(200, { 'Accept': 'application/zip' });
            res.statusMessage = 'Update Available';
            res.write(JSON.stringify({ url: downloadUrl }));
            console.log('Update: ' + downloadUrl);
          } else {
            res.statusCode = 204;
            res.statusMessage = 'No Content';
            console.log('No downloadUrl');
          }

        } else {
          res.statusCode = 204;
          res.statusMessage = 'No Content';
          console.log('No update available');
        }
      })
      .catch(err => {
        res.statusCode = err.statusCode || 400;
        res.statusMessage = err.statusMessage || 'Bad Request';
        console.log(err.message);
      })
      .then(() => res.end());
  });
}