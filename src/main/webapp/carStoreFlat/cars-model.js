angular.module('carStore.cars.models', ['js-data'])

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
			    
			  },
			  computed: {
				    // each function's argument list defines the fields
				    // that the computed property depends on
				    partTotal: ['partLineItems', function (partLineItems) {
				      
						var pTotal = 0;

						for(i=0; i<partLineItems.length; i++) {

							pTotal += partLineItems[i].quantity;
						}

						return pTotal;

				    }]

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