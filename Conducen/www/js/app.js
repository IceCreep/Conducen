// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'translate', 'app.controllers', 'ngAnimate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(typeof navigator.globalization !== "undefined") {
      navigator.globalization.getPreferredLanguage(function(language) {
          $translate.use((language.value).split("-")[0]).then(function(data) {
              console.log("SUCCESS -> " + data);
          }, function(error) {
              console.log("ERROR -> " + error);
          });
      }, null);
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('home', {
    url: "/",
    templateUrl: "templates/home.html",
    controller: 'HomeCtrl'
  })

  .state('conduit', {
    url: "/conduit",
    templateUrl: "templates/conduit-main.html",
    controller: 'ConduitCtrl'
  })

  .state('results', {
    url: "/results",
    templateUrl: "templates/results.html",
    controller: 'ResultsCtrl'
  })

  .state('ampacity', {
    url: "/ampacity",
    templateUrl: "templates/ampacity-main.html",
    controller: 'AmpacityCtrl'
  })

  .state('voltage-drop', {
    url: "/voltage-drop",
    templateUrl: "templates/voltage-drop-main.html",
    controller: 'VoltageDropCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })

  .state('app.playlists', {
    url: "/playlists",
    views: {
      'menuContent': {
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
