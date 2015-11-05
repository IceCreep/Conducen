angular.module('app')
.directive('voltageDropForm', ['dataAdapter', 'voltageDrop', function(dataAdapter, voltageDrop, $state) {
  return {
    restrict: "E",
    scope: {
      
    },
    controller: function($scope, $rootScope, $state, $translate, $ionicScrollDelegate) {

      $scope.init = function(){
          //Conductor materials
        $scope.conductorMaterials = voltageDrop.getConductorMaterials();

        //Conduit Materials
        $scope.conduitMaterials = voltageDrop.getConduitMaterials();

        //Phases
        $scope.phases = voltageDrop.getPhases();

        //Type of calculations
        $scope.calculations = voltageDrop.getCalculations();

        //Wire Sizes
        $scope.wireSizes = voltageDrop.getWireSizes();

        //Clear fields
        $scope.clear();

        //Pull again all the field info after a change of language option
        $rootScope.$on('$stateChangeSuccess', 
          function(event, toState, toParams, fromState, fromParams){
            if (toState.name == "voltage-drop") {
              $scope.init();
            };
          });
      }


      $scope.clear = function(){

        $ionicScrollDelegate.scrollTop(true);

        //Conductor materials
        $scope.conductorMaterial = null;

        //Conduit Materials
        $scope.conduitMaterial = null;

        //Phases
        $scope.phase = null;

        //Voltage
        $scope.voltage = null;

        //Power Factor
        $scope.powerFactor = null;

        //Type of calculation
        $scope.calculation = null;

        //Amperage
        $scope.ampacity = null;

        //Voltage drop
        $scope.voltageDrop = null;

        //Conductor size
        $scope.conductorLength = null;

        //Wire Size
        $scope.wireSize = null;

        //Error flags
        $scope.showZError = false;
        $scope.showRError = false;
        $scope.showCalculationError = false;
        $scope.showEmptyInputError = false;
        $scope.powerFactorError = false;
      },

      $scope.calculate = function(){

        //z eficaz      z = Rcosθ + Xlsenθ
        //Test case
        // $scope.conductorMaterial = "aluminum";
        // $scope.conduitMaterial = "steel";
        // $scope.powerFactor = 0.8;
        // $scope.phase = 1;
        // $scope.voltage = 480;
        // $scope.voltageDrop = 3;
        // $scope.ampacity = 200;
        // $scope.conductorLength = 100;
        // $scope.wireSize = "3/0 AWG (200/155 amps.)";

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

          if ($scope.powerFactor==undefined) {
            $scope.powerFactorError = true;
          }else{
            if($scope.powerFactor <=0 || $scope.powerFactor >1){
              $scope.powerFactorError = true;            
            }else{
              $scope.powerFactorError = false;           
            }
          }

          return;
        }else{
            $scope.showEmptyInputError = false;          
        }

        if ($scope.powerFactor==undefined) {
          $scope.powerFactorError = true;
        }else{
          if($scope.powerFactor <=0 || $scope.powerFactor >1){
            $scope.powerFactorError = true;            
          }else{
            $scope.powerFactorError = false;           
          }
        }

        // $scope.powerFactor = parseInt(String($scope.powerFactor).replace(",","."));

        var efficientZ = $scope.calculateEfficientZ();

        if (efficientZ == undefined) {
          return;
        };

        var conductorLength = $scope.conductorLength;

        //If it's in english convert from feet to meters
        if ($translate.use()=="en") {
          conductorLength = conductorLength / 3.280839895;
        }

        var z = voltageDrop.getZ($scope.phase, $scope.voltageDrop, $scope.voltage, $scope.ampacity, conductorLength);
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

          if ($scope.powerFactor==undefined) {
            $scope.powerFactorError = true;
          }else{
            if($scope.powerFactor <=0 || $scope.powerFactor >1){
              $scope.powerFactorError = true;            
            }else{
              $scope.powerFactorError = false;           
            }
          }

          return;
        }else{
            $scope.showEmptyInputError = false;          
        }

        if ($scope.powerFactor==undefined) {
          $scope.powerFactorError = true;
        }else{
          if($scope.powerFactor <=0 || $scope.powerFactor >1){
            $scope.powerFactorError = true;            
          }else{
            $scope.powerFactorError = false;           
          }
        }

        var efficientZ = voltageDrop.getEfficientZByWireSize($scope.conductorMaterial, $scope.conduitMaterial, $scope.powerFactor, $scope.wireSize);
        console.log("EfficientZByWireSize " + efficientZ.efficientZByWireSize);

        if(efficientZ.efficientZByWireSize != null){
          if(efficientZ.efficientZByWireSize != -1){
            var result = {};
            result.efficientZ = efficientZ.efficientZByWireSize;
            result.conductorLength = voltageDrop.getConductorLength($scope.phase, $scope.voltageDrop, $scope.voltage, $scope.ampacity, efficientZ.efficientZByWireSize);
            
            if ($translate.use()=="en") {
              result.conductorLength = result.conductorLength * 3.280839895;
            }

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

        var index = 0;

        var r = voltageDrop.getR($scope.conductorMaterial, $scope.conduitMaterial, index);
        if(r == "" || r <= 0 || r ==null || r==undefined){

            index ++;
            r = voltageDrop.getR($scope.conductorMaterial, $scope.conduitMaterial, index);

            if(r == "" || r <= 0 || r ==null || r==undefined){
                $scope.showRError = true;

                return;
            }else{
                $scope.showRError = false;
            }
        }else{
            $scope.showRError = false;
        }

        console.log("r " + r);

        var xl = voltageDrop.getXL($scope.conduitMaterial, index);
        console.log("xl " + xl);

        var efficientZ = voltageDrop.getEfficientZ($scope.conductorMaterial, $scope.conduitMaterial, $scope.powerFactor, index);

        console.log("efficientZ " + efficientZ);

        if (efficientZ==0) {
          index++;
          efficientZ = voltageDrop.getEfficientZ($scope.conductorMaterial, $scope.conduitMaterial, $scope.powerFactor, index);
        };

        if (efficientZ <0 || efficientZ == null) {
          $scope.showZError = true;

          return;
        }else{
          $scope.showZError = false;
        }

        return efficientZ;
      },

      $scope.init();
     
    },
    templateUrl: 'templates/directives/voltage-drop-form.html',
    link: function(scope, element, attrs) {
      //Init code goes here
    }
  };
}]);