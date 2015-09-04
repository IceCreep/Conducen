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

      //Wire Size
      $scope.wireSize;
      $scope.wireSizes = voltageDrop.getWireSizes();

      //Error flags
      $scope.showZError = false;
      $scope.showRError = false;
      $scope.showCalculationError = false;
      $scope.showEmptyInputError = false;

      $scope.calculate = function(){

        //z eficaz      z = Rcosθ + Xlsenθ
        //Test case
        // $scope.conductorMaterial = "cooper";
        // $scope.conduitMaterial = "steel";
        // $scope.powerFactor = 0.7;
        // $scope.phase = 3;
        // $scope.voltage = 480;
        // $scope.voltageDrop = 2;
        // $scope.ampacity = 150;
        // $scope.conductorLength = 50;
        // $scope.wireSize = "3/0";

        switch($scope.calculation){

          case "1":
            $scope.calculateConductorSize();
          break;

          case "2":
            $scope.calculateCircuitDistance();
          break;

          default:
          break;
        }
      },

      $scope.calculateConductorSize = function(){

        //Validate the form
        if ($scope.conductorMaterial == null || $scope.conduitMaterial == null || $scope.phase == null ||  $scope.voltage == null 
          || $scope.powerFactor == null || $scope.calculation == null || $scope.ampacity == null || $scope.conductorLength == null) {

          $scope.showEmptyInputError = true;

          return;
        }else{
          $scope.showEmptyInputError = false;          
        }

        var efficientZ = $scope.calculateEfficientZ();

        var z = voltageDrop.getZ($scope.phase, $scope.voltageDrop, $scope.voltage, $scope.ampacity, $scope.conductorLength);
        console.log("z " + z);

        var result = voltageDrop.getSize(z, $scope.conductorMaterial, $scope.conduitMaterial, $scope.powerFactor);
        console.log("size " + result.size);   
        
        if(result.size != null){
          voltageDrop.setInputData($scope.calculation-1, $scope.calculations[$scope.calculation-1].name, $scope.conductorMaterial, $scope.conduitMaterial, $scope.phase, $scope.voltage, $scope.voltageDrop, $scope.powerFactor, $scope.ampacity, $scope.conductorLength);
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
      },

      $scope.calculateCircuitDistance = function(){
        //Validate the form
        if ($scope.conductorMaterial == null || $scope.conduitMaterial == null || $scope.phase == null ||  $scope.voltage == null 
          || $scope.powerFactor == null || $scope.calculation == null || $scope.ampacity == null || $scope.wireSize == null) {

          $scope.showEmptyInputError = true;

          return;
        }else{
          $scope.showEmptyInputError = false;          
        }

        var efficientZ = voltageDrop.getEfficientZByWireSize($scope.conductorMaterial, $scope.conduitMaterial, $scope.powerFactor, $scope.wireSize);
        console.log("EfficientZByWireSize " + efficientZ.efficientZByWireSize);

        if(efficientZ.efficientZByWireSize != null){
          if(efficientZ.efficientZByWireSize != -1){
            var result = {};
            result.efficientZ = efficientZ.efficientZByWireSize;
            result.conductorLength = voltageDrop.getConductorLength($scope.phase, $scope.voltageDrop, $scope.voltage, $scope.ampacity, efficientZ.efficientZByWireSize);
            console.log("conductorLength " + result.conductorLength);

            $scope.showCalculationError = false;

            if (result.conductorLength!=null) {
              voltageDrop.setInputData($scope.calculation-1, $scope.calculations[$scope.calculation-1].name, $scope.conductorMaterial, $scope.conduitMaterial, $scope.phase, $scope.voltage, $scope.voltageDrop, $scope.powerFactor, $scope.ampacity, $scope.wireSize);
              voltageDrop.setResultData(result);
              $state.go('results', {"id": "voltage-drop"});
            }
          }else{
            //Error: Data out of table
            $scope.showCalculationError = true;
          }
        }else{
          //Error
          $scope.showCalculationError = true;
        }

      },

      $scope.calculateEfficientZ = function(){

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

        return efficientZ;
      }
     
    },
    templateUrl: 'templates/directives/voltage-drop-form.html',
    link: function(scope, element, attrs) {
      //Init code goes here
    }
  };
}]);