Please make sure you have installed global:

1. npm (v 3.8.6)
2. node (v5.12.0)
3. cordova (v6.1.1)
4. webpack

After that, please install all dependencies, to create project, run from root dir:

```
$ npm i
```

## Adding cordova plugins:

Plugin list:
1. cordova-plugin-contacts
2. cordova-plugin-sim only for Android
3. cordova-plugin-keyboard
4. cordova-plugin-compat
5. cordova-plugin-browsersync
6. cordova-plugin-splashscreen
7. cordova-plugin-network-information
8. cordova-plugin-dialogs
9. phonegap-plugin-barcodescanner
9. cordova.plugins.diagnostic

## Production

To build project files for production environment run:

```
$ NODE_ENV='production' platformName='platform' webpack --config tools/webpack/config.js
```


To build project with cordova for some platform please run, where platform_name: 'ios' || 'android':

```
$ cordova build platform_name
```

after this the cordova will run prod build and create build app for platform

To run project (run = build + install => device or simulator):

```
$ cordova run platform_name
```

## Development:

To build project files for development environment run:

```
$ NODE_ENV='development' platformName='platform' webpack --config tools/webpack/config.js
```

## Local:

To build project files for development environment run:

```
$ webpack --config tools/webpack/config.js
```

#### Run a local server:
Execute next line from project directory to run node express server with mocked data.

```
node tools/server.js
```

This will start localhost on 8030 port.
