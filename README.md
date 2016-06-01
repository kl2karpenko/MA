To create project on dev env run:

```
$ npm i
```

To build project on dev env run:

```
webpack --watch --config tools/webpack/config.js
```

To build project on prod env run:

```
$ NODE_ENV=production webpack --config tools/webpack/config.js
```

To build project in cordova run:

```
$ cordova build platform_name
```

after this the cordova will run prod build and create build app for platform


To run project in cordova run:

```
$ cordova run platform_name
```