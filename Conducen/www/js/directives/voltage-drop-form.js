angular.module('app')
.directive('voltageDropForm', ['dataAdapter', 'voltageDrop', function(dataAdapter, voltageDrop, $state) {
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

      //Type of calculation
      $scope.calculation;
      $scope.calculations = voltageDrop.getCalculations();

      //Amperage
      $scope.ampacity;

      //Voltage drop
      $scope.voltageDrop;

      //Conductor size
      $scope.conductorLength;

      //Conductor Size
      $scope.conductorSize;

      $scope.calculate = function(){

        //Warning: Needs to validate the form

        //z eficaz      z = Rcosθ + Xlsenθ
        //Test case
        $scope.conductorMaterial = "cooper";
        $scope.conduitMaterial = "pvc";
        $scope.powerFactor = 0.8;
        $scope.phase = 3;
        $scope.voltage = 480;
        $scope.voltageDrop = 3;
        $scope.ampacity = 200;
        $scope.conductorLength = 50;

        var r = voltageDrop.getR($scope.conductorMaterial, $scope.conduitMaterial, 0);
        console.log("r " + r);
        var xl = voltageDrop.getXL($scope.conduitMaterial, 0);
        console.log("xl " + xl);

        var efficientZ = voltageDrop.getEfficientZ($scope.conductorMaterial, $scope.conduitMaterial, $scope.powerFactor, 0);

        var z = voltageDrop.getZ($scope.phase, $scope.voltageDrop, $scope.voltage, $scope.ampacity, $scope.conductorLength);
        console.log("z " + z);

        var size = voltageDrop.getSize(z, $scope.conductorMaterial, $scope.conduitMaterial, $scope.powerFactor);
        console.log("size " + size);   
        
        if(size > 0){
          voltageDrop.setInputData($scope.conductorMaterial, $scope.conduitMaterial, $scope.phase, $scope.voltage, $scope.voltageDrop, $scope.powerFactor, $scope.ampacity, $scope.conductorLength);
          voltageDrop.setResultData(size, z);
          $state.go('results', {"id": "voltage-drop"});
        }else{
          if(size == 0){
            //Error: Data out of table
          }else{
            //Error
          }
        }    

        switch($scope.calculation){

          case 1:

          break;

          default:
          break;
        }
      }
     
    },
    templateUrl: 'templates/directives/voltage-drop-form.html',
    link: function(scope, element, attrs) {
      //Init code goes here
    }
  };
}]);