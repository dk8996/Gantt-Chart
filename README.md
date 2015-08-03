# Angular seed

This project is an application skeleton for a typical AngularJS application.

It contains AngularJS libraries, along some AngularJS plugins. It also contains a bunch of preconfigured grunt tasks, so you don't have to worry about build, development server or setting up a test runner.

## How to run the app

Start a local server

```
$ grunt server
```

Start mockey (if it was set up when the app was created)

```
$ grunt start-mockey
```

Stop mockey

```
$ grunt kill-mockey
```

## How to run unit tests

```
$ grunt run-unit
```

## How to run e2e tests

```
$ grunt run-e2e #It will open a browser tab poiting to http://localhost:9876  
```

## How to run the build

```
$ grunt build #It will create dist/ directory  
$ grunt server:dist #It will create dist/ directory and open a browser tap poiting to http://localhost:9010 serving dist/ directory  
```