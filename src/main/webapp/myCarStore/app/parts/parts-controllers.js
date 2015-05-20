angular.module('carStore.parts.controllers',['ui.router', 'js-data'])

	.controller('PartsCtrl',['$scope', 'Part', function($scope, Part) {

			var params = {			  
			};

		Part.bindAll(params, $scope, 'partList');
		Part.findAll();
		    		
	}

])
	.controller('PartCtrl',['$scope', 'Part', '$stateParams', function($scope, Part, $stateParams) {

		$scope.submitPart = function() {

			Part.save($scope.part)
		};

		Part.bindOne($stateParams.partId, $scope, 'part');
		
		
	}

])

	.controller('PartAddCtrl',['$scope', 'Part', function($scope, Part) {


		$scope.part = {};
		$scope.submitPart = function() {

			Part.create($scope.part);
		};
		
	}

])




