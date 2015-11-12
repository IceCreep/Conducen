angular.module('app')

.controller('HelpCtrl', function($scope, $translate, $rootScope) {

	$scope.language = $translate.use();

    $rootScope.$on('$stateChangeSuccess', 
	function(event, toState, toParams, fromState, fromParams){
		$scope.language = $translate.use();
	}); 
});

