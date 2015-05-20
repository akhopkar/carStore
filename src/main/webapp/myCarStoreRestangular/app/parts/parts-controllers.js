angular.module('carStore.parts.controllers',['restangular', 'ui.router'])

	.factory('partsCtx', function($rootScope) {

		var ctx = {};
		ctx.currEvent = '';

		ctx.partAdded = function() {

			this.currEvent = 'PART_ADDED';
			$rootScope.$broadcast('PARTS_EVENT');

		};

		return ctx;

	})

	.controller('PartsCtrl',['$scope', 'Restangular', 'partsCtx', function($scope, Restangular, partsCtx) {

		var partsREST = Restangular.all('parts');
		partsREST.getList().then(function(parts) {
		  $scope.partList = parts;
		});		

		$scope.$on('PARTS_EVENT', function() {

			var eventType = partsCtx.currEvent;
			if(eventType == 'PART_ADDED') {

				partsREST.getList().then(function(parts) {
						  $scope.partList = parts;
						});						
			}
		});

	}

])
	.controller('PartCtrl',['$scope', '$stateParams', 'Restangular', 'partsCtx', function($scope, $stateParams, Restangular, partsCtx) {

		$scope.submitPart = function() {

			alert('Submitting this part: ' + JSON.stringify($scope.part) );
			$scope.part.put().then(function(retVal) {
				alert('POST Returned this: ' + JSON.stringify(retVal));

			});
		};

		Restangular.one('parts', $stateParams.partId).get().then(function(part) {
			$scope.part = part;
		});
		
		
	}

])

	.controller('PartAddCtrl',['$scope', 'Restangular', '$state', 'partsCtx', function($scope, Restangular, $state, partsCtx) {

		var partsREST = Restangular.all('parts');		

		$scope.part = {};
		$scope.submitPart = function() {

			alert('Submitting this part: ' + JSON.stringify($scope.part) );
			partsREST.post($scope.part).then(function(retVal) {

				alert('POST Returned this: ' + JSON.stringify(retVal));
				partsCtx.partAdded();

				//$state.go('cars');

			});
		};
		
	}

])




