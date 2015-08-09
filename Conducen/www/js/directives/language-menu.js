angular.module('app')
.directive('languageMenu', ['utils', function(utils) {
  return {
    restrict: "E",
    scope: {
      
    },
    controller: function($scope, $rootScope, $translate) {
      $scope.showMenu = false;
      $scope.animationClass = "animate slide-down";


      $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          $scope.showMenu = false;
      })

      $scope.languageMenuOptions = [
        {
          "name" : "English",
          "key" : "en"
        },
        {
          "name" : "Español",
          "key" : "es"
        }
      ];
      
      $scope.toggleLanguageMenu = function(){
        if($scope.showMenu == false){
          $scope.showMenu = true;
        }else{
          $scope.showMenu = false;
        }
      };

      $scope.selectLanguage = function(language){
        $translate.use(language);
        // $scope.toggleLanguageMenu();
      };

      $scope.isActive = function(language){
        if(language == $translate.use()){
          return "active";
        }
      };
    },
    templateUrl: 'templates/directives/language-menu.html',
    link: function(scope, element, attrs) {
      //Init code goes here

      utils.initVH();

      $('.menu-bg').css({
          height: utils.vh(100)
      });
    }
  };
}]);