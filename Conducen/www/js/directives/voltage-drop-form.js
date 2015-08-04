angular.module('app')
.directive('voltageDropForm', ['dataAdapter', 'voltageDrop', function(dataAdapter, voltageDrop) {
  return {
    restrict: "E",
    scope: {
      
    },
    controller: function($scope, $rootScope, $state, $translate) {

      //Conductor materials
      $scope.conductorMaterial;
      $scope.conductorMaterials = voltageDrop.getConductorMaterials();

      //Conduit Materials
      $scope.conduitMaterial;
      $scope.conduitMaterials = voltageDrop.getConduitMaterials();

      //Phases
      $scope.phase;
      $scope.phases = voltageDrop.getPhases();

      //Voltage
      $scope.voltage;

      //Power Factor
      $scope.powerFactor;
     
    },
    templateUrl: 'templates/directives/voltage-drop-form.html',
    link: function(scope, element, attrs) {
      //Init code goes here
    }
  };
}]);