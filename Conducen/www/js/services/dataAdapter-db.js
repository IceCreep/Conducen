angular.module('app')
.factory('dataAdapter', ["$ionicPlatform", "$cordovaSQLite", function DataAdapterFactory($ionicPlatform, $cordovaSQLite) {

	// Database instance.
	var db;

	$ionicPlatform.ready(function() {
        // Instantiate database file/connection after ionic platform is ready.
        if (window.cordova) {
			window.plugins.sqlDB.copy("data/tables.sqlite", function() {
            	db = $cordovaSQLite.openDB("tables.sqlite");
	        }, function(error) {
	            console.error("There was an error copying the database: " + error);
	            db = $cordovaSQLite.openDB("tables.sqlite");
	        });
		}else{
			window.plugins.sqlDB.copy("data/tables.sqlite", function() {
            	db = window.openDatabase("data/tables.sqlite", '1', 'tables', 1024 * 1024 * 100); // browser
	        }, function(error) {
	            console.error("There was an error copying the database: " + error);
	            db = window.openDatabase("data/tables.sqlite", '1', 'tables', 1024 * 1024 * 100); // browser
	        });
		}		

		if(db) {
	        alert("database created / opened");
	        //div.innerHTML = div.innerHTML + "<hr>database created / opened";
	    }else{
	    	alert("Error on database created / opened");
	    }
    });

    function errorHandler(transaction, error) {

	    // error.message is a human-readable string.
	    // error.code is a numeric error code
	    alert('Oops.  Error was ' + error.message + ' (Code ' + error.code + ')');

	    // Handle errors here
	    var we_think_this_error_is_fatal = true;

	    if (we_think_this_error_is_fatal) return true;

	    return false;

	}

	return {
	    load5A: function() {

	    	if(db) {
		        alert("database created / opened");
		        //div.innerHTML = div.innerHTML + "<hr>database created / opened";
		    }else{
		    	alert("Error on database");
		    }

	    	if (window.cordova) {
		        // Execute SELECT statement to load message from database.
		        $cordovaSQLite.execute(db, 'SELECT * FROM Table5A')
	            .then(
	                function(result) {

	                    if (result.rows.length > 0) {

	                        var newMessage = result.rows.item(0).mm;
	                        var statusMessage = "Message loaded successful, cheers!";
	                    }
	                },
	                function(error) {
	                    var statusMessage = "Error on loading: " + error.message;
	                }
	            );
	        }else{
	            db.transaction(function(transaction) {
					transaction.executeSql('SELECT * FROM Table5A',[], function (trx, result) {
						for (var i=0; i < result.rows.length; i++) {
					  		alert(result.rows.item(i)); // <-- getting Field1 value
						}
					}, errorHandler);
				});
        	}
    	}
	}
}]);