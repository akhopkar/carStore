angular.module('carStore.parts.models', ['js-data'])

		  .factory('Part', function(DS) {

		 	return DS.defineResource({
			  name: 'part',
			  relations: {
			    hasMany: {
			      partLineItem: {
			        localField: 'partLineItems',
			        foreignKey: 'partId'
			      }
			    }
			  }
			});

		  })
