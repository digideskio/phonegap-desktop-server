**phonegap-desktop-server** is a server for handling API calls from the PhoneGap desktop app.

## docker

```
# build docker image

docker build -t phonegap/phonegap-desktop-crash-server:latest .
docker tag phonegap/phonegap-desktop-server:latest phonegap/phonegap-desktop-server:vX.X.X
```

```
# run locally

docker run --rm -it -p 7000:7000 phonegap/phonegap-desktop-server:latest

# shell into the image

docker run --rm -it -p 7000:7000 phonegap/phonegap-desktop-server:latest /bin/sh
```

```
# publish to docker hub

docker push phonegap/phonegap-desktop-server:latest
docker push phonegap/phonegap-desktop-server:vX.X.X
```

## license
[MIT license][license]

[deploy-img]: https://www.herokucdn.com/deploy/button.svg
[deploy-url]: https://heroku.com/deploy
[docs]: http://electron.atom.io/docs/api/crash-reporter/
[example]: https://github.com/johnmuhl/electron-crash-report-server/tree/master/electron-bomb
[demo]: https://pacific-falls-32011.herokuapp.com/
[issues]: https://github.com/johnmuhl/electron-crash-report-server/issues
[license]: https://github.com/johnmuhl/electron-crash-report-server/blob/master/LICENSE
