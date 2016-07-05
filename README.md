Please make sure you have installed global:

1. npm
2. node
3. cordova
4. webpack

After that, please install all dependencies, to create project, run from root dir:

```
$ npm i
```

## Build prod version:

To build project files for prod env run:

```
$ NODE_ENV=production webpack --config tools/webpack/config.js
```

## Add cordova plugins

Plugin list:
1. cordova-plugin-contacts
2. cordova-plugin-sim only for Android
3. ionic-plugin-keyboard
4. cordova-plugin-contacts-phonenumbers
5. cordova-plugin-compat
6. cordova-plugin-browsersync
7. cordova-plugin-splashscreen
8. cordova-plugin-network-information

To build project with cordova for some platform please run, where platform_name: 'ios' || 'android':

```
$ cordova build platform_name
```

after this the cordova will run prod build and create build app for platform


To run project in cordova run:

```
$ cordova run platform_name
```

## Build dev version in browser:


To build project files for dev env run, this will start watching all files changing:

```
webpack --watch --config tools/webpack/config.js
```

Go to build/ dir and run from there to start localhost on 8030 port:

```
node ../tools/server.js
```
