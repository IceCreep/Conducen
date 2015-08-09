angular.module('app')
.factory('dataAdapter', ["table5A", "table4A", function DataAdapterFactory(table5A, table4A) {

	var conduitData;
	var conduitResult;
	var nippleResult;

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
	    	var conduitDesignator;
	    	var conduitTrade;
	    	var nippleDesignator;
	    	var nippleTrade;
	    	var conduitFound = false;
	    	var nippleFound = false;
	    	var result;
	    	var dataLength = 0;
	    	var typeItems = [];

	    	for (var i = 0; i < table4A.data.length; i++) {
	    		var generalItem = table4A.data[i];

	    		if(type == generalItem.type){
	    			typeItems.push(generalItem);
	    			dataLength = typeItems.length;
	    		}
	    	}

	    	for (var i = 0; i < dataLength; i++) {
	    		var item = typeItems[i];

	    		if(type == item.type && conduitFound == false){
		    		if(area < item.mm40){
		    			conduitFound = true;
		    			conduitDesignator = item.designator;
		    			conduitTrade = item.size;
		    		}else{
			    		if (i >= dataLength-1) {
			    			conduitDesignator = item.designator;
			    			conduitTrade = item.size;
			    		}
		    		}
	    		}
	    		
	    		if(type == item.type && nippleFound == false){
		    		if(area < item.mm60){
		    			nippleFound = true;
		    			nippleDesignator = item.designator;
		    			nippleTrade = item.size;
		    		}else{
		    			if (i >= dataLength-1) {
			    			nippleDesignator = item.designator;
			    			nippleTrade = item.size;
			    		}
		    		}
	    		}
	    	};

	    	return result = {
	    		"conduitResult": {
		    		"designator" : conduitDesignator,
		    		"trade" : conduitTrade,
		    		"found" : conduitFound
	    		},
	    		"nippleResult": {
	    			"designator" : nippleDesignator,
		    		"trade" : nippleTrade,
		    		"found" : nippleFound
	    		}
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
	    },

	    setNippleResult: function(result){
	    	nippleResult = result;
	    },

	    getNippleResult: function(){
	    	return nippleResult;
	    }
	};
}]);