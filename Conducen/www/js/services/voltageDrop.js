angular.module('app')
.factory('voltageDrop', ["table9A", "$translate", function DataAdapterFactory(table9A, $translate) {

	var r3 = 1.732;
	var inputData;
	var resultData;

	return {
		getMaterialsByType: function(type){

			var result;

	    	if ($translate.use()=="en") {

	    		result = type;
		    }else{
		    	switch(type){
	    			case "copper":
	    				result = "Cobre";
	    			break;

	    			case "aluminum":
	    				result = "Aluminio";
	    			break;

	    			case "steel":
	    				result = "Acero";
	    			break;
	    		}
		    }

		    if(type == "pvc"){
		    	result = "PVC";
		    }

		    return result;
	    },

	    getConductorMaterials: function(){
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

	    getConduitMaterials: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "PVC",
			          "id" : "1",
			          "type" : "pvc"
			        },
			        {
			          "name" : "Aluminum",
			          "id" : "2",
			          "type" : "aluminum"
			        },
			        {
			          "name" : "Steel",
			          "id" : "3",
			          "type" : "steel"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "PVC",
			          "id" : "1",
			          "type" : "pvc"
			        },
			        {
			          "name" : "Aluminio",
			          "id" : "2",
			          "type" : "aluminum"
			        },
			        {
			          "name" : "Acero",
			          "id" : "3",
			          "type" : "steel"
			        }
		        ];
		    }
	    },

	    getPhases: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "One Phase",
			          "id" : "1"
			        },
			        {
			          "name" : "Three Phase",
			          "id" : "3"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "Monofásico",
			          "id" : "1"
			        },
			        {
			          "name" : "Trifásico",
			          "id" : "3"
			        }
		        ];
		    }
	    },

	    getPhasesById: function(id){
	    	var result;

	    	if ($translate.use()=="en") {
		        if(id==1){
		        	result = "One Phase"
		        }else{
		        	result = "Three Phase"
		        }
		    }else{
		    	if(id==1){
		        	result = "Monofásico"
		        }else{
		        	result = "Trifásico"
		        }
		    }

		    return result;
	    },

	    getCalculations: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "Conductor Size",
			          "id" : "1"
			        },
			        {
			          "name" : "Circuit Distance (feet)",
			          "id" : "2"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "Calibre del Conductor (AWG o kcmil)",
			          "id" : "1"
			        },
			        {
			          "name" : "Longitud Max. (m)",
			          "id" : "2"
			        }
		        ];
		    }
	    },

	    getDegrees: function(cos){
	    	var grades = 0;

	    	grades = Math.acos(cos) * (180/Math.PI);

	    	return grades;
	    },

	    getSen: function(degrees){
	    	var sen = 0;

	    	sen = Math.sin(degrees * (Math.PI / 180));

	    	return sen;
	    },

	    getR: function(conductor, conduit, index){

	    	var key = "r_" + conductor + "_" + conduit;
	    	var item = table9A.data[index];
	    	var r = item[key];
	    	return r;
	    },

	    getXL: function(conduit, index){

	    	var key = "xl_" + conduit;
	    	var item = table9A.data[index];
	    	var r = item[key];
	    	return r;
	    },

	    getEfficientZ: function(conductor, conduit, powerFactor, index){
	    	var z = this.getR(conductor, conduit, index)*powerFactor + this.getXL(conduit, index)*this.getSen(this.getDegrees(powerFactor));
	    	return z;
	    },

	    getZ: function(phase, voltageDrop, voltage, ampacity, conductorLength){
	    	var z = 0;

	    	if (phase == 3) {
	    		z = (10 * voltageDrop * voltage) / (1.732 * ampacity * conductorLength);
	    	}else{
	    		z = (5 * voltageDrop * voltage) / (ampacity * conductorLength);
	    	}
	    	return z;
	    },

	    getSize: function(z, conductor, conduit, powerFactor){
	    	var efficientZ = -1;
	    	var item;
	    	var result = -1;
	    	var initialIndex = 0;

	    	if (conductor == "aluminum") {
	    		initialIndex = 1;
	    	};

	    	for (var i = initialIndex; i < table9A.data.length; i++) {
	    		item = table9A.data[i];

	    		efficientZ = this.getEfficientZ(conductor, conduit, powerFactor, i);

	    		if(efficientZ > z){
	    			result = item.size;
	    		}else{
	    			result = item.size;

	    			if (efficientZ>0) {
		    			return { 
		    				"size" : result,
		    				"efficientZ" : efficientZ,
		    				"error" : null
		    			};
	    			};
	    		}
	    	}

	    	return { 
				"size" : result,
				"efficientZ" : efficientZ,
				"error" : true
			};
	    },

	    getEfficientZByWireSize: function(conductor, conduit, powerFactor, wireSize){
	    	var efficientZ = -1;
	    	var item;

	    	for (var i = 0; i < table9A.data.length; i++) {
	    		item = table9A.data[i];

	    		if(item.size == wireSize){
	    			efficientZ = this.getEfficientZ(conductor, conduit, powerFactor, i);
	    		}
	    	}

	    	return { 
				"efficientZByWireSize" : efficientZ,
				"error" : true
			};
	    },

	    getConductorLength: function(phase, voltageDrop, voltage, ampacity, efficientZ){
			var l = 0;

	    	if (phase == 3) {
	    		l = (10 * voltageDrop * voltage) / (efficientZ * 1.732 * ampacity);
	    	}else{
	    		l = (5 * voltageDrop * voltage) / (efficientZ * ampacity);
	    	}
	    	return l;
	    },

	    setInputData: function(calculationTypeIndex, calculationType, conductorMaterial, conduitMaterial, phase, voltage, voltageDrop, powerFactor, ampacity, conductorLength){
	    	inputData = {
	    		"calculationTypeIndex" : calculationTypeIndex,
	    		"calculationType" : calculationType,
	    		"conductorMaterial" : this.getMaterialsByType(conductorMaterial),
	    		"conduitMaterial" : this.getMaterialsByType(conduitMaterial),
	    		"phase" : this.getPhasesById(phase),
	    		"voltage" : voltage,
	    		"voltageDrop" : voltageDrop,
	    		"powerFactor" : powerFactor,
	    		"ampacity" : ampacity,
	    		"conductorLength" : conductorLength
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
	    },

	    //For getting the Maximum Circuit Distance
	    getWireSizes: function(){
	    	return [
		        "14 AWG (20/-- amps.)", "12 AWG (25/20 amps.)", "10 AWG (35/30 amps.)", "8 AWG (50/40 amps.)", "6 AWG (65/50 amps.)", "4 AWG (85/65 amps.)", "3 AWG (100/75 amps.)", "2 AWG (115/90 amps.)", "1 AWG (130/100 amps.)", "1/0 AWG (150/120 amps.)", "2/0 AWG (175/135 amps.)", "3/0 AWG (200/155 amps.)", "4/0 AWG (230/180 amps.)", "250 kcmil (255/205 amps.)", "300 kcmil (285/230 amps.)", "350 kcmil (310/250 amps.)", "400 kcmil (335/270 amps.)", "500 kcmil (380/310 amps.)", "600 kcmil (420/340 amps.)", "750 kcmil (475/385 amps.)", "1000 kcmil (545/445 amps.)"
		    ];
	    }
	};
}]);