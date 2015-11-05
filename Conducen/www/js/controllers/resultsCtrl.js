angular.module('app')

.controller('ResultsCtrl', ['$scope', 'dataAdapter', '$rootScope', '$window', '$stateParams', 'voltageDrop', '$translate', 'ampacity',  function($scope, dataAdapter, $rootScope, $window, $stateParams, voltageDrop, $translate, ampacity) {

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

    if($scope.state == "ampacity"){
        $scope.ampacityInputData = ampacity.getInputData();
        $scope.ampacityResult = ampacity.getResultData();
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

                if($scope.state == "ampacity"){
                    $scope.ampacityInputData = ampacity.getInputData();
                    $scope.ampacityResult = ampacity.getResultData();
                }
            }
		});

    $scope.goBack = function(){
    	$window.history.back();
    }

    $scope.isLanguage = function(language){
        if(language == $translate.use()){
            return true;
        }else{
            return false;
        }
    }
}]);

