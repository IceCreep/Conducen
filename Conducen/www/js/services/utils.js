angular.module('app')
.factory('utils', function UtilsFactory() {
	
	var w = $(window).width()/100;
    var h = $(window).height()/100;

	return {
	    initVH: function(val){
	    	w = $(window).width()/100;
	    	h = $(window).height()/100;
	    },

		vw: function(val) {
			return  w*val+'px';
		},

		vh: function(val) {
			return  h*val+'px';
		}
	}
});