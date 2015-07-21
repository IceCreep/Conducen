angular.module('app')
.directive('secondaryMenu', ['utils', function(utils) {
  return {
    restrict: "E",
    scope: {
      
    },
    controller: function($scope, $rootScope, $state) {
      $scope.showMenu = false;
      $scope.currentState = $state.current.name;

      $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          $scope.showMenu = false;
          $scope.currentState = toState.name;
      })
      
      $scope.toggleMenu = function(){
        if($scope.showMenu == false){
          $scope.showMenu = true;
        }else{
          $scope.showMenu = false;
        }
      };

      $scope.isActive = function(state){
        if(state == $scope.currentState){
          return "active";
        }
      };
    },
    templateUrl: 'templates/directives/secondary-menu.html',
    link: function(scope, element, attrs) {
      //Init code goes here

      utils.initVH();

      $('.menu-bg').css({
          height: utils.vh(100)
      });
    }
  };
}]);