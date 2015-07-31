angular.module('app')

.controller('ResultsCtrl', ['$scope', 'dataAdapter', '$rootScope', '$window', function($scope, dataAdapter, $rootScope, $window) {

    $scope.conduitData = dataAdapter.getConduitData();
    $scope.conduitResult = dataAdapter.getConduitResult();

    $rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 
			$scope.conduitData = dataAdapter.getConduitData();  
			$scope.conduitResult = dataAdapter.getConduitResult();
		});

    $scope.goBack = function(){
    	$window.history.back();
    }
}]);

