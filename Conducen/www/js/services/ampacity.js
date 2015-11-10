angular.module('app')
.factory('ampacity', ["$translate", "tableA1", "tableA3", "tableA4", "tableA8", function DataAdapterFactory($translate, tableA1, tableA3, tableA4, tableA8) {

	var inputData;
	var resultData;

	return {

	    getWireMaterials: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "Copper",
			          "id" : "1",
			          "type" : "copper"
			        },
			        {
			          "name" : "Aluminum",
			          "id" : "2",
			          "type" : "aluminum"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "Cobre",
			          "id" : "1",
			          "type" : "copper"
			        },
			        {
			          "name" : "Aluminio",
			          "id" : "2",
			          "type" : "aluminum"
			        }
		        ];
		    }
	    },

	    getConductorTypes: function(){
	        return [
		        {
		        	"id" : "1",
					"tc" : "tw",
					"ta" : "60"
		        },
		        {
		        	"id" : "2",
					"tc" : "thw",
					"ta" : "75"
		        },
		        {
		        	"id" : "3",
					"tc" : "rhw",
					"ta" : "75"
		        },
		        {
		        	"id" : "4",
					"tc" : "thhw",
					"ta" : "75"
		        },
		        {
		        	"id" : "5",
					"tc" : "thwn",
					"ta" : "75"
		        },
		        {
		        	"id" : "6",
					"tc" : "thw-2",
					"ta" : "90"
		        },
		        {
		        	"id" : "7",
					"tc" : "rhh",
					"ta" : "90"
		        },
		        {
		        	"id" : "8",
					"tc" : "rhw-2",
					"ta" : "90"
		        },
		        {
		        	"id" : "9",
					"tc" : "thhn",
					"ta" : "90"
		        },
		        {
		        	"id" : "10",
					"tc" : "thwn-2",
					"ta" : "90"
		        },
		        {
		        	"id" : "11",
					"tc" : "xhhw",
					"ta" : "90"
		        },
		        {
		        	"id" : "12",
					"tc" : "xhhw-2",
					"ta" : "90"
		        },
		        {
		        	"id" : "13",
					"tc" : "xhh",
					"ta" : "90"
		        },
	        ];
	    },

	    getConductorTa: function(conductor){
	    	var result = null;
	    	var array = this.getConductorTypes();

	    	for (var i = 0; i < array.length; i++) {
	    		var item = array[i];
	    		if(item.tc == conductor){
	    			result  = item.ta;
	    			return result;
	    		}
	    	}

	    	return result;
	    },

	    getTerminalTemps: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "140˚ F",
			          "id" : "1",
			          "value" : "60"
			        },
			        {
			          "name" : "167˚ F",
			          "id" : "2",
			          "value" : "75"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "60˚ C",
			          "id" : "1",
			          "value" : "60"
			        },
			        {
			          "name" : "75˚ C",
			          "id" : "2",
			          "value" : "75"
			        }
		        ];
		    }
	    },

	    getAmbientTemps: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "69-77˚ F",
			          "id" : "1",
			          "type" : "21-25"
			        },
			        {
			          "name" : "78-86˚ F",
			          "id" : "2",
			          "type" : "26-30"
			        },
			        {
			          "name" : "87-95˚ F",
			          "id" : "3",
			          "type" : "31-35"
			        },
			        {
			          "name" : "96-104˚ F",
			          "id" : "4",
			          "type" : "36-40"
			        },
			        {
			          "name" : "105-113˚ F",
			          "id" : "5",
			          "type" : "41-45"
			        },
			        {
			          "name" : "114-122˚ F",
			          "id" : "6",
			          "type" : "46-50"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "21-25˚ C",
			          "id" : "1",
			          "type" : "21-25"
			        },
			        {
			          "name" : "26-30˚ C",
			          "id" : "2",
			          "type" : "26-30"
			        },
			        {
			          "name" : "31-35˚ C",
			          "id" : "3",
			          "type" : "31-35"
			        },
			        {
			          "name" : "36-40˚ C",
			          "id" : "4",
			          "type" : "36-40"
			        },
			        {
			          "name" : "41-45˚ C",
			          "id" : "5",
			          "type" : "41-45"
			        },
			        {
			          "name" : "46-50˚ C",
			          "id" : "6",
			          "type" : "46-50"
			        }
		        ];
		    }
	    },

	    getAmbientTempsByRange: function(range){

	    	var temps = this.getAmbientTemps();

			for (var i = 0; i < temps.length; i++) {
				if (temps[i].type == range) {
					return temps[i].name;
				}	
			}
	    },

	    getConductorsRanges: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "3 or less",
			          "id" : "1",
			          "value" : "1.00"
			        },
			        {
			          "name" : "4",
			          "id" : "2",
			          "value" : "0.8"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "no más de 3",
			          "id" : "1",
			          "value" : "1.00"
			        },
			        {
			          "name" : "4",
			          "id" : "2",
			          "value" : "0.8"
			        }
		        ];
		    }
	    },

	    getConductorsRangesByValue: function(value){
	    	if ($translate.use()=="en") {
	    		if(value==1.00){
	    			return "3 or less";
	    		}else{
	    			return "4";
	    		}
		    }else{
		    	if(value==1.00){
	    			return "no más de 3";
	    		}else{
	    			return "4";
	    		}
		    }
	    },

	    getAC: function(continousCurrent, nonContinousCurrent){
			var result = -1;

			result = (1.25 * continousCurrent) + nonContinousCurrent;

			return result;
		},

		getCB: function(ac, material, tt){
			var result = -1;
			var cb = -1;
			var index = 0;
			var conductors = -1;
			var size = -1;

			if(material == "aluminum" && ac > 80 && tt == 60){
				return -2;
			}else{
				if(material == "copper" && ac > 125 && tt == 60){
					return -2;
				}
			}

			for (var i = 0; i < tableA1.data.length; i++) {
				if(cb < 0){
		    		item = tableA1.data[i];

		    		if(item.cb < ac ){
		    			index = i;
		    		}else{
		    			index = i;

		    			cb = item.cb;

		    			var key = material + "_conductors"; 
						conductors = item[key];			

						key = material + "_" + tt;
						size = item[key];
		    		}
		    	}
	    	}		

	    	result = {
	    		"cb" : cb,
	    		"conductors" : conductors,
	    		"size" : size
	    	};

			return result;
		},

		getFC: function(ta, material, tt){
			var result = -1;
			var key = material + "_" + tt;

			for (var i = 0; i < tableA3.data.length; i++) {
				
	    		item = tableA3.data[i];

	    		if(ta == item.c){
	    			result = item[key];
	    		}
		    	
	    	}		

			return result;
		},

		getC2: function(material, ta, atar){
			var result = -1;
			var key = material + "_" + ta;

			for (var i = 0; i < tableA4.data.length; i++) {
				var item = tableA4.data[i];

				if(item[key]!=""){
					if(parseInt(item[key]) < atar ){
		    			index = i;
		    		}else{
		    			index = i;

		    			result = { 
		    				"c2" : item.size,
		    				"ata" : item[key],
		    				"index" : i
		    			};

		    			return result;
		    		}
		    	}
			};

			return result;
		},

		getC2ByIndex: function(material, ta, index){
			var result = -1;
			var key = material + "_" + ta;

			var item = tableA4.data[index];

			if(item[key]!=""){

    			result = { 
    				"c2" : item.size,
    				"ata" : item[key],
    				"index" : index
    			};

    			return result;
	    	}

			return result;
		},

		getATABySize: function(material, ta, size){
			var result = -1;
			var key = material + "_" + ta;

			for (var i = 0; i < tableA4.data.length; i++) {
				var item = tableA4.data[i];

				if(item[key]!=""){
					if(item.size == size ){

		    			result = item[key]; 

		    			return result;
		    		}
		    	}
			};

			return result;
		},

		getWireSizeId: function(size){
			var result = -1;

			for (var i = 0; i < tableA8.data.length; i++) {
				var item = tableA8.data[i];

				if(item.size == size ){

	    			result = item.id; 

	    			return result;
	    		}
			};

			return result;
		},

	    setInputData: function(wireMaterial, conductorType, continousCurrent, nonContinousCurrent, terminalTemp, ambientTemperature, conductorsRange){
	    	inputData = {
	    		"wireMaterial" : wireMaterial,
	    		"conductorType" : conductorType,
	    		"continousCurrent" : continousCurrent,
	    		"nonContinousCurrent" : nonContinousCurrent,
	    		"terminalTemp" : terminalTemp,
	    		"ambientTemperature" : ambientTemperature,
	    		"conductorsRange" : conductorsRange
	    	}
	    },

	    getInputData: function(){
	    	return inputData;
	    },

	    setResultData: function(result){
	    	resultData = result;
	    },

	    getResultData: function(){
	    	return resultData;
	    }
	};
}]);