angular.module('customFilters', []).filter('numberWithComma', function() {
  return function(input) {
    return input.replace(".", ",");
  };
});