// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('expressto',
  ['ionic',
  'ngMap', 
  "expressto.controller", 
  'ngCordova'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.run(function($window, $rootScope, $state, $ionicPopup) {

    $rootScope.googleMapsUrl="https://maps.google.com/maps/api/js?key=AIzaSyBmnmTCsEUdpzgrHX7WW2uNcjF-dtQxY8I";
    
    if (typeof($window.localStorage['access_token'])!=='undefined' && $window.localStorage['access_token'] !==''){
      $rootScope.isAuthenticated = true;
      $rootScope.user = $window.localStorage['user'];
    }
    
    $rootScope.get_refreshed = function() {
      $rootScope.ready_to_accept = false;
      $state.go($state.current, {}, {reload: true});
    };

})

.config( function($httpProvider) {
  //$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
  $httpProvider.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state("login", {
      url: "/login",
      controller: "login_controller",
      templateUrl: "templates/login.html"
    })
    .state("register", {
      url: "/register",
      controller: "register_controller",
      templateUrl: "templates/register.html"
    })
    .state("account", {
      url: "/account",
      controller: "account_controller",
      templateUrl: "templates/account.html"
    })
    .state("index", {
      url: "/index",
      controller: "map_controller",
      templateUrl: "templates/map.html"
    })
    .state("braintree_payment", {
      url: "/braintree_payment",
      controller: "braintree_payment_controller",
      templateUrl: "templates/braintree_payment.html"
    })
    .state("request_pickup", {
      url: "/request_pickup",
      controller: "request_pickup_controller",
      templateUrl: "templates/request_pickup.html"
    })
    ;
    $urlRouterProvider.otherwise("/index");
})

;