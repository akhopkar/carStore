angular.module('run-adapter', ['js-data'])
.run(function (DS) {

		    DS.registerAdapter('localstorage', new DSLocalStorageAdapter(), { default: true });


		  })