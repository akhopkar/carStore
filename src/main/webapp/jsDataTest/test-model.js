angular.module('test-model', ['js-data'])

		  .factory('Test', function(DS) {

		 	return DS.defineResource({
			  name: 'test',
			  relations: {
			    hasMany: {
			      myAction: {
			        localField: 'myActions',
			        foreignKey: 'testId'
			      }
			    }
			  }
			});

		  })

		  .factory('MyAction', function(DS) {

		 	return DS.defineResource({
			  name: 'myAction',
			  belongsTo: {
			      test : {
			        localKey: 'testId',
			        localField: 'test',			        			      
			      }
			    }
			  
			});

		  })