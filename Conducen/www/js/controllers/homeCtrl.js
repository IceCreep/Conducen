angular.module('app.controllers', ['pascalprecht.translate'])

.controller('HomeCtrl', function($scope, $translate) {

    this.showMenu = false;
    
    this.toggleLanguageMenu = function(){
      if(this.showMenu == false){
        this.showMenu = true;
      }else{
        this.showMenu = false;
      }
    };

    this.selectLanguage = function(language){
      $translate.use(language);
    }
});

