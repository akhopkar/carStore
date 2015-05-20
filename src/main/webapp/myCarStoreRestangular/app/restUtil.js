angular.module('carStore.rest-utils',['carStore.cache-utils']) 


.run(
  [  '$rootScope', 'Restangular', 'restObjectCache',       
    function ($rootScope, Restangular, restObjectCache) {

    	
    	Restangular.extendModel('cars', function(car) {

    		car.isConfirmed = function() {

    			return car.status == 'CONFIRMED'
    		}

    		return car;

    	});


/*
    	Restangular.extendModel('partLineItems', function(pli) {

    		//pli.loadPart = function() {

	    		var cachedObj = restObjectCache.getRESTEntity('part', pli.part.id);
	    		//alert('setting partObj to: ' + cachedObj);
	    		console.log(cachedObj);
	    		if(cachedObj) {
	    			pli.partObj = cachedObj;

	    		} else {

					Restangular.one('parts', pli.part.id).get().then(function(part) {
						pli.partObj = part;
					});

	    		}

    		//}

    		return pli;

    	});
*/
    }
  ]
)

