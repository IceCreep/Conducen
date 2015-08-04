angular.module('app')
.directive('conduitForm', ['dataAdapter', function(dataAdapter) {
  return {
    restrict: "E",
    scope: {
      
    },
    controller: function($scope, $rootScope, $state, $translate) {

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

      $scope.conduitTypes = [
        {
          "name" : "EMT",
          "type" : "1"
        },
        {
          "name" : "ENT",
          "type" : "2"
        },
        {
          "name" : "FMC",
          "type" : "3"
        },
        {
          "name" : "IMC",
          "type" : "4"
        },
        {
          "name" : "LFNC-A",
          "type" : "5"
        },
        {
          "name" : "LFNC",
          "type" : "6"
        },
        {
          "name" : "RMC",
          "type" : "7"
        },
        {
          "name" : "PVC 80",
          "type" : "8"
        },
        {
          "name" : "PVC 40 o HDPE",
          "type" : "9"
        },
        {
          "name" : "PVC A",
          "type" : "10"
        },
      ];

      $scope.conductors = [];
      $scope.currentArea = 0;
      $scope.currentAreaMm = 0;
      $scope.currentAreaIn = 0;
      $scope.currentConductorType = 0;
      $scope.result = 0;
      $scope.data = {
        "conductors" : $scope.conductors,
        "conductorType" : $scope.conductorType
      };

      var Conductor = function(){
        return {
          wires: null,
          size: null,
          insulation: null,
          insulationGroup: null
        };
      };

      this.currentConductor = new Conductor;

      $scope.addConductor = function(item){
        if(item == null){
          return;
        }

        if(item.wires == null || item.size == null || item.insulation == null){
          return;
        }

        var newConductor = new Conductor;
        newConductor.wires = item.wires;
        newConductor.size = item.size;
        newConductor.insulation = item.insulation;
        newConductor.insulationGroup = $scope.getConduitInsulationGroup(item.insulation);

        $scope.conductors.push(newConductor);

        $scope.currentConductor = new Conductor;

        $scope.currentAreaMm += dataAdapter.getArea(newConductor).mm
        $scope.currentAreaIn += dataAdapter.getArea(newConductor).inches;

        if($translate.use() == "en"){
          $scope.currentArea = $scope.currentAreaIn;
        }else{
          $scope.currentArea = $scope.currentAreaMm;
        }
      };

      $scope.removeConductor = function(item){
        $scope.conductors.splice($scope.conductors.indexOf(item), 1);
      };

      $scope.calculate = function(){
        if ($scope.currentConductorType!=null && $scope.conductors.length>0) {
          $scope.result = dataAdapter.getDesignatorAndTrade($scope.currentAreaMm, $scope.currentConductorType);

          //Get the conduit type name
          $scope.data.conductorType = $scope.getConduitTypeName($scope.currentConductorType);

          dataAdapter.setConduitResult($scope.result);
          dataAdapter.setConduitData($scope.data);

          $state.go('results');
        }
      };

      $scope.getConduitTypeName = function(type){
        for (var i = 0; i < $scope.conduitTypes.length; i++) {
          if($scope.conduitTypes[i].type == type){
            return $scope.conduitTypes[i].name;
          } 
        }
      };

      $scope.getConduitInsulationGroup = function(type){
        for (var i = 0; i < $scope.insulationTypes.length; i++) {
          if($scope.insulationTypes[i].type == type){
            return $scope.insulationTypes[i].group;
          } 
        }
      };
    },
    templateUrl: 'templates/directives/conduit-form.html',
    link: function(scope, element, attrs) {
      //Init code goes here
    }
  };
}]);