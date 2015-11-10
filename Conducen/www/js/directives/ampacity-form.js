angular.module('app')
.directive('ampacityForm', ['dataAdapter', 'ampacity', function(dataAdapter, ampacity) {
  return {
    restrict: "E",
    controller: function($scope, $rootScope, $state, $translate, $ionicScrollDelegate) {

      $scope.initialized = false;

      $scope.init = function(){

        $scope.initialized = true;

        //Wire materials
        $scope.wireMaterials = ampacity.getWireMaterials();

        //Conductor Types
        $scope.conductorTypes = ampacity.getConductorTypes();

        //Terminal Temperatures
        $scope.terminalTemps = ampacity.getTerminalTemps();

        //Ambient Temperatures
        $scope.ambientTemps = ampacity.getAmbientTemps();

        //Conductors Ranges
        $scope.conductorsRanges = ampacity.getConductorsRanges();

        $scope.clear();

        //Pull again all the field info after a change of language option
        var listener = $rootScope.$on('$stateChangeSuccess', 
          function(event, toState, toParams, fromState, fromParams){

            if(fromParams.id == "ampacity" && fromState.name == "results" && toState.name == "ampacity"){
              if ($scope.initialized == false) {
                // console.log("Must fill with results data");
              }

            }else{
              if(fromState.name == "ampacity" && toState.name == "results"){
                // console.log("Not Clean");
              }else{
                // console.log("Must Clean");
                $scope.clear();
                $scope.initialized = false;
              }
            }

          });
      }

      $scope.clear = function(){

        $ionicScrollDelegate.scrollTop(true);

        $scope.wireMaterial = null;

        $scope.conductorType = null;

        $scope.conductorTa = null;

        $scope.continousCurrent = null;

        $scope.nonContinousCurrent = null;

        $scope.terminalTemp = null;

        $scope.ambientTemperature = null;

        $scope.conductorsRange = null;

        //Errors
        $scope.showCBError = false;
        $scope.showResultsWarning = false;
        $scope.showInputError = false;

        $scope.ac = null;
        $scope.cb = null;
        $scope.cb1 = null;
        $scope.fc = null;
        $scope.ft = null;
        $scope.fcb = null;
        $scope.c1 = null;
        $scope.c1Num = null;
        $scope.cr = null;
        $scope.fcr = null;
        $scope.atar = null;
        $scope.c2 = null;
        $scope.c2Index = null;
        $scope.c2Num = null;
        $scope.ata = null;
        $scope.acu = null;
        $scope.c3 = null;
        $scope.c3Num = null;
      }

      $scope.calculate = function(){

        //For testing
        // $scope.wireMaterial = "copper";
        // $scope.conductorType = "thhn";
        // $scope.continousCurrent = 400;
        // $scope.nonContinousCurrent = 110;
        // $scope.terminalTemp = 75;
        // $scope.ambientTemperature = "36-40";
        // $scope.conductorsRange = 0.80;

        // $scope.wireMaterial = "aluminum";
        // $scope.conductorType = "xhhw-2";
        // $scope.continousCurrent = 1500;
        // $scope.nonContinousCurrent = 1000;
        // $scope.terminalTemp = 75;
        // $scope.ambientTemperature = "21-25";
        // $scope.conductorsRange = 1.0;

        if ($scope.wireMaterial == null ||
          $scope.conductorType == null ||
          $scope.continousCurrent == null ||
          $scope.nonContinousCurrent== null ||
          $scope.terminalTemp == null ||
          $scope.ambientTemperature == null ||
          $scope.conductorsRange == null) {

          $scope.showInputError = true;
          return;
        }else{
          $scope.showInputError = false;
        }

        $scope.ac = ampacity.getAC($scope.continousCurrent, $scope.nonContinousCurrent);
        console.log("AC " + $scope.ac);

        var cbResult = $scope.calculateCB($scope.ac);
        if(cbResult.cb == null){
          return;
        }
        $scope.cb = cbResult.cb;
        $scope.c1 = cbResult.size;
        $scope.c1Num = cbResult.conductors;

        $scope.conductorTa = ampacity.getConductorTa($scope.conductorType);

        $scope.fc = ampacity.getFC($scope.ambientTemperature, $scope.wireMaterial, $scope.conductorTa);
        console.log("FC " + $scope.fc);

        $scope.ft = parseFloat($scope.conductorsRange) * $scope.fc;
        console.log("FT " + $scope.ft); 

         if($scope.ft == 1){
            //TODO: Show results for CB, C1 and #C1
            ampacity.setInputData($scope.wireMaterial, $scope.conductorType, $scope.continousCurrent, $scope.nonContinousCurrent, $scope.terminalTemp, ampacity.getAmbientTempsByRange($scope.ambientTemperature), ampacity.getConductorsRangesByValue($scope.conductorsRange));
            
            var wireSize;
            if($scope.c1>=250){
              wireSize = $scope.c1 + " kcmil";
            }else{
              wireSize = $scope.c1 + " AMG";
            }

            ampacity.setResultData({
              "cb" : $scope.cb,
              "c_label" : "C1",
              "c" : $scope.c1,
              "c_num_label" : "#C1",
              "c_num" : $scope.c1Num 
            });
            console.log("CB " + $scope.cb + "\n"
            + "C1 " + $scope.c1 + "\n"
            + "#C1 " + $scope.c1Num + "\n"); 

            $state.go('results', {"id": "ampacity"});

         }else{
            $scope.goToPhaseB();
         }   
      }

      $scope.goToPhaseB = function(){
        if($scope.cb > 800){

          $scope.fcb = $scope.cb / $scope.c1Num;
          console.log("Phase B FCB " + $scope.fcb);

          $scope.atar = $scope.fcb / $scope.ft;
          console.log("Phase B ATAR " + $scope.atar);

          var c2Result = ampacity.getC2($scope.wireMaterial, $scope.conductorTa, $scope.atar);

          $scope.c2 = c2Result.c2;
          $scope.ata = c2Result.ata;

          $scope.goToCompareC2();

        }else{

          var isCycling = false;

          //Abnormal Conditions
            console.log("Cycling... " + $scope.cb1);
            $scope.fcb = $scope.cb / $scope.c1Num;
            console.log("Phase B FCB " + $scope.fcb);

            $scope.cr = $scope.continousCurrent + $scope.nonContinousCurrent;
            console.log("Phase B CR " + $scope.cr);

            $scope.fcr = $scope.cr / $scope.c1Num;
            console.log("Phase B FCR " + $scope.fcr);

            $scope.atar = Math.floor($scope.fcr / $scope.ft);
            console.log("Phase B ATAR " + $scope.atar);

            //Cycle
            var c2Result = ampacity.getC2($scope.wireMaterial, $scope.conductorTa, $scope.atar);

          do{
            
            if(isCycling){
              c2Result = ampacity.getC2ByIndex($scope.wireMaterial, $scope.conductorTa, $scope.c2Index);
            }

            $scope.c2 = c2Result.c2;
            $scope.ata = c2Result.ata;
            $scope.c2Index = c2Result.index;

            console.log("Phase B C2 " + $scope.c2);
            console.log("Phase B ATA " + $scope.ata);

            $scope.acu = Math.ceil($scope.ata * $scope.ft);
            console.log("Phase B ACU " + $scope.acu);

            var cbResult = $scope.calculateCB($scope.acu);
            if(cbResult.cb == null){
              return;
            }
            $scope.cb1 = Math.ceil(cbResult.cb);
            $scope.c2Num = cbResult.conductors;

            console.log("CB1 " + $scope.cb1);
            console.log("C2Num " + $scope.c2Num);
            console.log("C2 " + $scope.c2);

            isCycling = true;
            $scope.c2Index++;

          }while($scope.cb1 < $scope.fcb);

          isCycling = false;

          $scope.goToCompareC2();
        }
      }

      $scope.calculateCB = function(relativeParameter){
        var cb = ampacity.getCB(relativeParameter, $scope.wireMaterial, $scope.terminalTemp);

        //FC errors
        if(cb == -2){
          $scope.showCBError = true;
          return;
        }else{
          if (cb == -1) {
            $scope.showResultsWarning = true;
          }else{
            $scope.showCBError = false;
            $scope.showResultsWarning = false;
          }
        }
        
        return {
          "cb": cb.cb,
          "size" : cb.size,
          "conductors": cb.conductors
        };
      }

      $scope.goToCompareC2 = function(){
        if($scope.c2 > 600){
          console.log("c2 is higher than 600");

          $scope.c3 = 600;

          $scope.goToPhaseC();
        }else{
          console.log("c2 is lower than 600");

          $scope.goToPhaseD();
        }
      }

      $scope.goToPhaseC = function(){
        $scope.ata = ampacity.getATABySize($scope.wireMaterial, $scope.conductorTa, $scope.c3);
        console.log("Phase C ATA " + $scope.ata);

        $scope.acu = $scope.ata * $scope.ft;
        console.log("Phase C ACU " + $scope.acu);

        if($scope.cb > 800){
          $scope.c3Num = Math.ceil($scope.cb/$scope.acu);
        }else{
          $scope.c3Num = Math.ceil($scope.ac/$scope.acu);
        }

        ampacity.setInputData($scope.wireMaterial, $scope.conductorType, $scope.continousCurrent, $scope.nonContinousCurrent, $scope.terminalTemp, ampacity.getAmbientTempsByRange($scope.ambientTemperature), ampacity.getConductorsRangesByValue($scope.conductorsRange));
        
        var wireSize;
        if($scope.c3>=250){
          wireSize = $scope.c3 + " kcmil";
        }else{
          wireSize = $scope.c3 + " AMG";
        }

        ampacity.setResultData({
          "cb" : $scope.cb,
          "c_label" : "C3",
          "c" : wireSize,
          "c_num_label" : "#C3",
          "c_num" : $scope.c3Num 
        });
        console.log("CB " + $scope.cb + "\n"
            + "C3 " + $scope.c3 + "\n"
            + "#C3 " + $scope.c3Num + "\n");   

        $state.go('results', {"id": "ampacity"});        
      }

      $scope.goToPhaseD = function(){
        if(parseInt(ampacity.getWireSizeId($scope.c1)) > parseInt(ampacity.getWireSizeId($scope.c2))){
          console.log("c1 > c2");
          $scope.c2 = $scope.c1;
        }

        ampacity.setInputData($scope.wireMaterial, $scope.conductorType, $scope.continousCurrent, $scope.nonContinousCurrent, $scope.terminalTemp, ampacity.getAmbientTempsByRange($scope.ambientTemperature), ampacity.getConductorsRangesByValue($scope.conductorsRange));
        var wireSize;
        
        if($scope.c2>=250){
          wireSize = $scope.c2 + " kcmil";
        }else{
          wireSize = $scope.c2 + " AMG";
        }

        ampacity.setResultData({
          "cb" : $scope.cb,
          "c_label" : "C2",
          "c" : wireSize,
          "c_num_label" : "#C1",
          "c_num" : $scope.c1Num 
        });
        console.log("Phase D CB " + $scope.cb + "\n"
            + "Phase D C2 " + $scope.c2 + "\n"
            + "Phase D #C1 " + $scope.c1Num + "\n");

        $state.go('results', {"id": "ampacity"});
      }

      $scope.init();
     
    },
    templateUrl: 'templates/directives/ampacity-form.html',
    link: function(scope, element, attrs) {
      //Init code goes here
    }
  };
}]);