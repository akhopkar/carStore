angular.module('carStore.cars.models', ['js-data'])

		  .factory('Car', function(DS) {

		 	return DS.defineResource({
			  name: 'car'			   
			});

		  })

		  .factory('PartLineItem', function(DS) {

		 	return DS.defineResource({
			  name: 'partLineItem'
			});

		  })