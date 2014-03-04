// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app"
    },
    "shim": {
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrap-select': {
            deps: ['jquery']
        },
    }
});

//See: https://github.com/mbostock/d3/issues/1693
define("d3.global", ["d3"], function(_) {
  d3 = _;
});

// Load the main app module to start the app
requirejs(["app/main"]);
