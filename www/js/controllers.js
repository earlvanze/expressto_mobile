angular.module("arova.controller", ["ngCordova"])

.controller('CheckController', function($scope, $cordovaInAppBrowser) {
    document.addEventListener("deviceready", onDeviceReady, false);
     
    function onDeviceReady() {
         
        var scheme;
 
        // Don't forget to add the org.apache.cordova.device plugin!
        if(device.platform === 'iOS') {
            scheme = 'tapingo://';
        }
        else if(device.platform === 'Android') {
            scheme = 'com.tapingo';
        }
         
        appAvailability.check(
            scheme, // URI Scheme
            function() {  // Success callback
                alert(scheme + ' is available :)');
            },
            function() {  // Error callback
                alert(scheme + ' is not available :(');
            }
        );
        
        // AppAvailability Demo Code (Button)
        var button = document.getElementById('openTapingo');
        
        // Event handler
        button.addEventListener('click', function() {
            appAvailability.check(
                scheme, // URI Scheme
                function() {  // Success callback
                    // Open profile in Twitter app
                    window.open('tapingo://', '_system');
                },
                function() {  // Error callback
                    // Open profile in InAppBrowser
                    window.open('https://www.tapingo.com/order/campus/new-york-university/pickup/', '_blank');
                }
            );
        }, false);   
    }
})

;