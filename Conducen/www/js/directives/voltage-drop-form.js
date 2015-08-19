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

      //Error flags
      $scope.showZError = false;
      $scope.showRError = false;
      $scope.showCalculationError = false;
      $scope.showEmptyInputError = false;

      $scope.calculate = function(){

        switch($scope.calculation){

          case "1":
            $scope.calculateConductorSize();
          break;

          default:
          break;
        }
      },

      $scope.calculateConductorSize = function(){
        //Warning: Needs to validate the form
        if ($scope.conductorMaterial == null || $scope.conduitMaterial == null || $scope.phase == null ||  $scope.voltage == null 
          || $scope.powerFactor == null || $scope.calculation == null || $scope.ampacity == null || $scope.conductorLength == null) {

          $scope.showEmptyInputError = true;

          return;
        }else{
          $scope.showEmptyInputError = false;          
        }

        //z eficaz      z = Rcosθ + Xlsenθ
        //Test case
        // $scope.conductorMaterial = "cooper";
        // $scope.conduitMaterial = "pvc";
        // $scope.powerFactor = 0.8;
        // $scope.phase = 3;
        // $scope.voltage = 480;
        // $scope.voltageDrop = 3;
        // $scope.ampacity = 200;
        // $scope.conductorLength = 50;

        var r = voltageDrop.getR($scope.conductorMaterial, $scope.conduitMaterial, 0);
        console.log("r " + r);
        if(r == "" || r <= 0 || r ==null){
            $scope.showRError = true;

            return;
        }else{
            $scope.showRError = false;
        }

        var xl = voltageDrop.getXL($scope.conduitMaterial, 0);
        console.log("xl " + xl);

        var efficientZ = voltageDrop.getEfficientZ($scope.conductorMaterial, $scope.conduitMaterial, $scope.powerFactor, 0);

        if (efficientZ <=0 || efficientZ == null) {
          $scope.showZError = true;

          return;
        }else{
          $scope.showZError = false;
        }

        var z = voltageDrop.getZ($scope.phase, $scope.voltageDrop, $scope.voltage, $scope.ampacity, $scope.conductorLength);
        console.log("z " + z);

        var result = voltageDrop.getSize(z, $scope.conductorMaterial, $scope.conduitMaterial, $scope.powerFactor);
        console.log("size " + result.size);   
        
        if(result.size != null){
          voltageDrop.setInputData($scope.calculations[$scope.calculation].name, $scope.conductorMaterial, $scope.conduitMaterial, $scope.phase, $scope.voltage, $scope.voltageDrop, $scope.powerFactor, $scope.ampacity, $scope.conductorLength);
          voltageDrop.setResultData(result);
          $state.go('results', {"id": "voltage-drop"});

          $scope.showCalculationError = false;
        }else{
          if(result.size == 0){
            //Error: Data out of table
            $scope.showCalculationError = true;

            return;
          }else{
            //Error
            $scope.showCalculationError = true;

            return;
          }
        }  
      }
     
    },
    templateUrl: 'templates/directives/voltage-drop-form.html',
    link: function(scope, element, attrs) {
      //Init code goes here
    }
  };
}]);