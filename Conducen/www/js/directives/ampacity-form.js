angular.module('app')
.directive('ampacityForm', ['dataAdapter', function(dataAdapter) {
  return {
    restrict: "E",
    scope: {
      
    },
    controller: function($scope, $rootScope, $state, $translate) {

     
    },
    templateUrl: 'templates/directives/voltage-drop-form.html',
    link: function(scope, element, attrs) {
      //Init code goes here
    }
  };
}]);