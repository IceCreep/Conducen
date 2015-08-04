angular.module('app')
.factory('dataAdapter', ["table5A", "table4A", function DataAdapterFactory(table5A, table4A) {

	var conduitData;
	var conduitResult;

	return {
	    getArea: function(conductor){
	    	var mm;
	    	var inches;

	    	for (var i = 0; i < table5A.data.length; i++) {
	    		var item = table5A.data[i];
	    		
	    		if(item.size == conductor.size && item.group == conductor.insulationGroup){
	    			mm = item.mm;
	    			inches = item.in;
	    		}
	    	};

	    	return {
	    		"mm": mm*conductor.wires,
	    		"inches": inches*conductor.wires
	    	}
	    },

	    getDesignatorAndTrade: function(area, type){
	    	var designator;
	    	var trade;
	    	var designatorFound = false;
	    	var tradeFound = false;
	    	var result;

	    	for (var i = 0; i < table4A.data.length; i++) {
	    		var item = table4A.data[i];

	    		if(type == item.type && designatorFound == false){
		    		if(area < item.mm40){
		    			designatorFound = true;
		    			designator = item.designator;
		    		}
	    		}
	    		
	    		if(type == item.type && tradeFound == false){
		    		if(area < item.mm60){
		    			tradeFound = true;
		    			trade = item.size;
		    		}
	    		}
	    	};

	    	return result = {
	    		"designator" : designator,
	    		"trade" : trade
	    	};
	    },

	    setConduitData: function(data){
	    	conduitData = data;
	    },

	    getConduitData: function(){
	    	return conduitData;
	    },

	    setConduitResult: function(result){
	    	conduitResult = result;
	    },

	    getConduitResult: function(){
	    	return conduitResult;
	    }
	};
}]);