angular.module('app')

.controller('ResultsCtrl', ['$scope', 'dataAdapter', '$rootScope', '$window', '$stateParams', 'voltageDrop', function($scope, dataAdapter, $rootScope, $window, $stateParams, voltageDrop) {

    if ($stateParams.id!=null) {
        $scope.state = $stateParams.id;
    };   

    if($scope.state == "conduit"){
        $scope.conduitData = dataAdapter.getConduitData();
        $scope.conduitResult = dataAdapter.getConduitResult();
        $scope.nippleResult = dataAdapter.getNippleResult();
    }

    if($scope.state == "voltage-drop"){
        $scope.voltageDropInputData = voltageDrop.getInputData();
        $scope.voltageDropResult = voltageDrop.getResultData();
    } 

    $rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 

            if(toState.name == "results"){
                if ($stateParams.id!=null) {
                    $scope.state = $stateParams.id;
                };  

                if($scope.state == "conduit"){
                    $scope.conduitData = dataAdapter.getConduitData();
                    $scope.conduitResult = dataAdapter.getConduitResult();
                    $scope.nippleResult = dataAdapter.getNippleResult();
                }

                if($scope.state == "voltage-drop"){
                    $scope.voltageDropInputData = voltageDrop.getInputData();
                    $scope.voltageDropResult = voltageDrop.getResultData();
                } 
            }
		});

    $scope.goBack = function(){
    	$window.history.back();
    }
}]);

