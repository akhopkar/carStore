angular.module('car-model', ['js-data'])

		  .factory('Car', function(DS) {

		 	return DS.defineResource({
			  name: 'car',
			  relations: {
			    hasMany: {
			      partLineItem: {
			        localField: 'partLineItems',
			        foreignKey: 'carId'
			      }
			    }
			    
			  }
			});

		  })

		  .factory('PartLineItem', function(DS) {

		 	return DS.defineResource({
			  name: 'partLineItem',
			  relations: {
			    
			    belongsTo: {

			      car: {
			        localKey: 'carId',
			        localField: 'car',			        			      
			      },

			      part: {
			        localKey: 'partId',
			        localField: 'part'
			      }

			    }
			  }
			});

		  })