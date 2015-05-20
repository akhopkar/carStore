angular.module('carStore.cars.controllers',['carStore.cache-utils', 'carStore.rest-utils'])

	.factory('carCtx', ['$state', '$rootScope', function($state, $rootScope) {



		var ctx = {};
		ctx.currEvent = '';
		ctx.carToAdd = {};
		ctx.partLineItems = [];
		ctx.currentStep = 1;

		ctx.processNext = function() {

			if(this.currentStep == 1) {

				this.requestGoToStep2();

			} else if(this.currentStep == 2) {

				this.requestGoToFinish();
			}
		};

		ctx.processPrevious = function() {

			if(this.currentStep == 2) {

				this.requestGoToStep1();
			}
		};

		ctx.setCurrentStep = function(currStep) {

			this.currentStep = currStep;
		};

		ctx.setCarToAdd = function(carToAdd) {

			this.carToAdd = carToAdd;
		};

		ctx.setPartLineItems = function(pliList) {

			this.partLineItems = pliList;
		};

		ctx.requestGoToStep2 = function() {

			this.currEvent = 'GO_TO_STEP_2';
			$rootScope.$broadcast('ADD_CAR_EVENT');

		};

		ctx.requestGoToFinish = function() {

			this.currEvent = 'GO_TO_FINISH';
			$rootScope.$broadcast('ADD_CAR_EVENT');

		};

		ctx.requestGoToStep1 = function() {

			this.currEvent = 'GO_TO_STEP_1';
			$rootScope.$broadcast('ADD_CAR_EVENT');

		};

		ctx.navigateToStep2 = function() {

			$state.go('addCar.step2');
		};

		ctx.navigateToFinish = function() {

			$state.go('addCar.finish');
		};

		ctx.navigateToStep1 = function() {

			$state.go('addCar.step1');
		};


		return ctx;

	}])

	.controller('AddCarCtrl',['$scope', 'Restangular', '$state', 'carCtx', function($scope, Restangular, $state, carCtx) {

		$scope.hidePrevious = false;
		$scope.hideNext = false;

		$scope.nextStep = function() {

			carCtx.processNext();

		};

		$scope.previousStep = function() {

			carCtx.processPrevious();

		};

	}

])

	.controller('AddCarStep1Ctrl',['$scope', 'Restangular', 'carCtx', '$stateParams', function($scope, Restangular, carCtx, $stateParams) {

		$scope.isStep1 = true;
		$scope.car = {status : 'DRAFT'};

		console.log('CAR CTX = ');
		console.log(carCtx);

		carCtx.setCurrentStep(1);

		$scope.$on('ADD_CAR_EVENT', function() {

			var carsREST = Restangular.all('cars');		

			var eventType = carCtx.currEvent;
			if(eventType == 'GO_TO_STEP_2') {


				carsREST.post($scope.car).then(function(retVal) {

					$scope.car = retVal;
					carCtx.setCarToAdd($scope.car);
					carCtx.navigateToStep2();
					//$state.go('cars');

				});


			}
		});

	}

])

	.controller('AddCarStep2Ctrl',['$scope', 'Restangular', 'carCtx', '$state', 'restObjectCache', '$stateParams', function($scope, Restangular, carCtx, $state, restObjectCache, $stateParams) {

		$scope.isStep2 = true;
		$scope.partsList = [];		
		$scope.partLineItems = carCtx.partLineItems;

		var partsREST = Restangular.all('parts');		
		var pliREST = Restangular.all('partLineItems');		

		console.log('STATE PARAMS')
		console.log($stateParams);

		$scope.updatePartTotal = function() {

			var newPLI = $scope.partLineItems;
			var pTotal = 0;

			for(i=0; i<newPLI.length; i++) {

				pTotal += newPLI[i].quantity;
			}

			$scope.partTotal = pTotal;

		}

		$scope.updatePartTotal();


		$scope.$watchCollection('partLineItems', function ( newPLI ) {

			var pTotal = 0;

			for(i=0; i<newPLI.length; i++) {

				pTotal += newPLI[i].quantity;
			}

			$scope.partTotal = pTotal;

		});

		partsREST.getList().then(function(parts) {
/*
						 for(i=0; i<parts.length; i++) {
						 	var nxtPart = parts[i];
						 	console.log('restObjectCache is');
						 	console.log(restObjectCache);
						 	restObjectCache.cacheRESTEntity('part', nxtPart.id, nxtPart);
						 }
*/
						  $scope.partsList = parts;

						});	

		carCtx.setCurrentStep(2);

		$scope.$on('ADD_CAR_EVENT', function() {

			var eventType = carCtx.currEvent;navigateToFinish
			if(eventType == 'GO_TO_FINISH') {

				carCtx.carToAdd.status = 'CONFIRMED'
				carCtx.carToAdd.put().then(function(retVal) {

					carCtx.navigateToFinish();

				});

			} else if(eventType == 'GO_TO_STEP_1') {

				carCtx.navigateToStep1();
			
			} 
		});

		$scope.addPartToCar = function(part) {

			var pli = {
				part : part, 
				quantity : 1,
				car : carCtx.carToAdd				
			};

			/*
			var car = carCtx.carToAdd
			car.post('partLineItems', pli).then(function(retVal) {

				$scope.partLineItems.push(retVal);
			});
			*/

			
			pliREST.post(pli).then(function(retVal) {

				$scope.partLineItems.push(retVal);

			});
			

		};

		$scope.incrementPartQty = function(pli) {

			pli.quantity = pli.quantity + 1;
			pli.put();
			$scope.updatePartTotal();

		};

		$scope.decrementPartQty = function(pli) {

			if(pli.quantity > 0) {

				pli.quantity = pli.quantity - 1;
				pli.put();
				$scope.updatePartTotal();
			}

		};


		$scope.removePartFromCar = function(pli) {

			pli.remove().then(function(retVal) {

				pliREST.getList({carId : carCtx.carToAdd.id}).then(function(retVal) {

					$scope.partLineItems = retVal;	
					$scope.updatePartTotal();
				});

			});
			

		};



	}

])

	.controller('AddCarFinishCtrl',['$scope', 'Restangular', 'carCtx', function($scope, Restangular, carCtx) {

		$scope.isFinish = true;
		carCtx.setCurrentStep(3);

	}

])



	.controller('CarsCtrl',['$scope', 'Restangular', '$state', 'carCtx', function($scope, Restangular, $state, carCtx) {

		$scope.greeting = 'Hello there';

		$scope.carList = [];

		var carsREST = Restangular.all('cars');		
		var pliREST = Restangular.all('partLineItems');		

		carsREST.getList().then(function(cars) {
						  $scope.carList = cars;
						});	

		$scope.continueDraft = function(draft) {

			alert('isConfirmed = ' + draft.isConfirmed)

			pliREST.getList({carId : draft.id}).then(function(retVal) {

				carCtx.setCarToAdd(draft);
				carCtx.setPartLineItems(retVal);
				$state.go('addCar.step2');	
					
			});
				

		};

				
	}

])




