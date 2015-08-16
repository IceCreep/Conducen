angular.module('app')
.factory('voltageDrop', ["table9A", "$translate", function DataAdapterFactory(table9A, $translate) {

	var r3 = 1.732;
	var inputData;
	var resultData;

	return {
	    getConductorMaterials: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "Cooper",
			          "id" : "1",
			          "type" : "cooper"
			        },
			        {
			          "name" : "Aluminium",
			          "id" : "2",
			          "type" : "aluminium"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "Cobre",
			          "id" : "1",
			          "type" : "cooper"
			        },
			        {
			          "name" : "Aluminio",
			          "id" : "2",
			          "type" : "aluminium"
			        }
		        ];
		    }
	    },

	    getConduitMaterials: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "Conduit PVC",
			          "id" : "1",
			          "type" : "pvc"
			        },
			        {
			          "name" : "Aluminium",
			          "id" : "2",
			          "type" : "aluminium"
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
			          "name" : "Conduit PVC",
			          "id" : "1",
			          "type" : "pvc"
			        },
			        {
			          "name" : "Aluminio",
			          "id" : "2",
			          "type" : "aluminium"
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
			          "name" : "Single Phase",
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

	    getCalculations: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "Conductor Size",
			          "id" : "1"
			        },
			        {
			          "name" : "Circuit Distance",
			          "id" : "2"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "Calibre del Conductor",
			          "id" : "1"
			        },
			        {
			          "name" : "Longitud Máxima",
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
	    	var efficientZ;
	    	var item;
	    	var result = -1;

	    	for (var i = 0; i < table9A.data.length; i++) {
	    		item = table9A.data[i];

	    		efficientZ = this.getEfficientZ(conductor, conduit, powerFactor, i);

	    		if(efficientZ > z){
	    			result = item.size;
	    		}else{
	    			result = item.size;
	    			return result;
	    		}
	    	}

	    	return 0;
	    },

	    setInputData: function(conductorMaterial, conduitMaterial, phase, voltage, voltageDrop, powerFactor, ampacity, conductorLength){
	    	inputData = {
	    		"conductorMaterial" : conductorMaterial,
	    		"conduitMaterial" : conduitMaterial,
	    		"phase" : phase,
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

	    setResultData: function(size, z){
	    	resultData = {
	    		"size" : size,
	    		"z" : z
	    	}
	    },

	    getResultData: function(){
	    	return resultData;
	    },
	};
}]);