angular.module('app')
.directive('conduitForm', function() {
  return {
    restrict: "E",
    scope: {
      
    },
    controller: function($scope, $rootScope, $state) {

      $scope.wireSizes = [
        14, 12, 10, 8, 6, 4, 3, 2, 1, "1/0", "2/0", "3/0", "4/0", 250, 300, 350, 400, 500, 600, 700, 750, 1000
      ];

      $scope.insulationTypes = [
        {
          "type" : "TW",
          "group" : "1"
        },
        {
          "type" : "THW",
          "group" : "1"
        },
        {
          "type" : "THW-2",
          "group" : "1"
        },
        {
          "type" : "THHW",
          "group" : "1"
        },
        {
          "type" : "RHH",
          "group" : "2"
        },
        {
          "type" : "RHW",
          "group" : "2"
        },
        {
          "type" : "RHW-2",
          "group" : "2"
        },
        {
          "type" : "THHN",
          "group" : "3"
        },
        {
          "type" : "THWN",
          "group" : "3"
        },
        {
          "type" : "THWN-2",
          "group" : "3"
        },
        {
          "type" : "XHHW",
          "group" : "3"
        },
        {
          "type" : "XHHW-2",
          "group" : "3"
        },
        {
          "type" : "XHH",
          "group" : "3"
        }
      ];

    },
    templateUrl: 'templates/directives/conduit-form.html',
    link: function(scope, element, attrs) {
      //Init code goes here
    }
  };
});