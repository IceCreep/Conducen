angular.module('app')
.factory('voltageDrop', ["table5A", "table4A", "$translate", function DataAdapterFactory(table5A, table4A, $translate) {

	return {
	    getConductorMaterials: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "Cooper",
			          "id" : "1"
			        },
			        {
			          "name" : "Aluminium",
			          "id" : "2"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "Cobre",
			          "id" : "1"
			        },
			        {
			          "name" : "Aluminio",
			          "id" : "2"
			        }
		        ];
		    }
	    },

	    getConduitMaterials: function(){
	    	if ($translate.use()=="en") {
		        return [
			        {
			          "name" : "Conduit PVC",
			          "id" : "1"
			        },
			        {
			          "name" : "Aluminium",
			          "id" : "2"
			        },
			        {
			          "name" : "Steel",
			          "id" : "3"
			        }
		        ];
		    }else{
		    	return [
			        {
			          "name" : "Conduit PVC",
			          "id" : "1"
			        },
			        {
			          "name" : "Aluminio",
			          "id" : "2"
			        },
			        {
			          "name" : "Acero",
			          "id" : "3"
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
			          "id" : "2"
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
			          "id" : "2"
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
	    }
	};
}]);