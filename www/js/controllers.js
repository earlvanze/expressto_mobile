angular.module("expressto.controller", ["uiGmapgoogle-maps", "nemLogging", "ngMap"])

.controller("menu_controller", function($scope, $ionicSideMenuDelegate, $state){
    
})

.controller("request_pickup_controller", function($scope, $state, NgMap, $ionicPopup, $rootScope){

})

.controller("map_controller", function($scope, $state, uiGmapGoogleMapApi, uiGmapIsReady, nemSimpleLogger, NgMap, $ionicPlatform, $ionicPopup, $rootScope){

    navigator.geolocation.getCurrentPosition(function($position){
        // success!
        setup_map(parseFloat($position.coords.latitude), parseFloat($position.coords.longitude));
    }, function($error){
        setup_map({latitude: 40.6892, longitude: -74.0444});
        // error!
    });

    var setup_map = function($latitude, $longitude){
    // NgMap.getMap().then(function(map){
    //     $rootScope.map = {};
    //     $rootScope.map.center = {latitude: parseFloat($latitude),
    //             longitude: parseFloat($longitude)};
    //     // $rootScope.map.center = [parseFloat($latitude), parseFloat($longitude)];
    //     $rootScope.map.zoom = 8;
    //     console.log($rootScope.map);
    //     console.log(map.getCenter());
    // });

        uiGmapGoogleMapApi.then(function(maps){
            $rootScope.map = {
                center: {
                    latitude: parseFloat($latitude),
                    longitude: parseFloat($longitude)
                },
                zoom: 14
            }
            // console.log($rootScope.map);
        });

    $scope.me = [{'id':'me',
              'coords': 
              {'latitude': parseFloat($latitude),
               'longitude': parseFloat($longitude)
              },
              'icon': "img/mylocation.png",
              'options': {
              'icon': {
                  //'scaledSize': new google.maps.Size(34, 44)
              }
              },
            }]; 
    }
})

.controller("login_controller", function($scope, $ionicPopup, $rootScope, $window, $http, $state, $location, $cookies){
    $scope.credentials = {};
    $scope.login = function() {
        User.login($scope.credentials, function(response) {
            $window.localStorage['access_token']=response.id;
            $window.localStorage['user']=response.user;
            $rootScope.isAuthenticated = true;
            $rootScope.user = response.user;
            $state.go('index');
        }, function(response) {
            $ionicPopup.alert({
                 title: 'Login Failed',
                 template: '<div style="text-align: center">Please try again.</div>'
               });
        })
    }

    if (AppAuth.currentUser === null) {
        if ($cookies.access_token) {
            $scope.currentUser =
            AppAuth.currentUser = { id: 'social' };
        }
    }
    AppAuth.ensureHasCurrentUser(User);
    $scope.currentUser = AppAuth.currentUser;

    $scope.login_fb = function() {
        $window.location = '/auth/facebook';
    }

    $scope.login_google = function() {
        $window.location = '/auth/google';
    }

    $scope.login_twitter = function() {
        $window.location = '/auth/twitter';
    }

    $scope.register = function() {
        $state.go('register');
    }
})

;