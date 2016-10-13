angular.module("expressto.controller", ["ngMap"])

.controller("menu_controller", function($scope, $ionicSideMenuDelegate, $state){
    
})

.controller("request_pickup_controller", function($scope, $state, NgMap, $ionicPopup, $rootScope){

})

.controller("map_controller", function($scope, $state, NgMap, $ionicPlatform, $ionicPopup, $rootScope){

    navigator.geolocation.getCurrentPosition(function($position){
        // success!
        setup_map(parseFloat($position.coords.latitude), parseFloat($position.coords.longitude));
    }, function($error){
        setup_map({latitude: 40.6892, longitude: -74.0444});
        // error!
    });

    var setup_map = function($latitude, $longitude){
    NgMap.getMap().then(function(map){
        $rootScope.map = {};
        $rootScope.map.center = {latitude: parseFloat($latitude),
                longitude: parseFloat($longitude)};
        // $rootScope.map.center = [parseFloat($latitude), parseFloat($longitude)];
        $rootScope.map.zoom = 8;
        console.log($rootScope.map);
        console.log(map.getCenter());
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

;