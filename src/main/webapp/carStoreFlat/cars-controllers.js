angular.module('carStore.cars.controllers',['js-data'])

	.factory('carCtx', ['$state', '$rootScope', function($state, $rootScope) {

		var ctx = {};
		ctx.currEvent = '';
		ctx.carToAdd = {};
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

	.controller('AddCarCtrl',['$scope', '$state', 'carCtx', function($scope, $state, carCtx) {

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

	.controller('AddCarStep1Ctrl',['$scope', 'Car', 'carCtx', '$stateParams', function($scope, Car, carCtx, $stateParams) {

		$scope.isStep1 = true;
		$scope.car = {status : 'DRAFT'};

		console.log('CAR CTX = ');
		console.log(carCtx);

		carCtx.setCurrentStep(1);

		$scope.$on('ADD_CAR_EVENT', function() {


			var eventType = carCtx.currEvent;
			if(eventType == 'GO_TO_STEP_2') {


				Car.create($scope.car).then(function(retVal) {

					console.log('CREATE RETURNED THIS: ');
					console.log(retVal);
					$scope.car = retVal;
					carCtx.setCarToAdd(retVal);
					carCtx.navigateToStep2();
					//$state.go('cars');

				});


			}
		});

	}

])

	.controller('AddCarStep2Ctrl',['$scope', 'Car', 'Part', 'PartLineItem', 'carCtx', '$state', '$stateParams', function($scope, Car, Part, PartLineItem, carCtx, $state, $stateParams) {

		$scope.isStep2 = true;
		$scope.partLineItems = carCtx.partLineItems;

		console.log('STATE PARAMS')
		console.log($stateParams);		

			var params = {			  
			};

		Part.bindAll(params, $scope, 'partsList');
		Part.findAll();

		carCtx.setCurrentStep(2);

		console.log('CAR ID IS: ' + carCtx.carToAdd.id);

		Car.bindOne(carCtx.carToAdd.id, $scope, 'car');

		PartLineItem.bindAll(
			{carId : carCtx.carToAdd.id},
			$scope,
			'partLineItemList'
			)

		$scope.$on('ADD_CAR_EVENT', function() {

			var eventType = carCtx.currEvent;

			if(eventType == 'GO_TO_FINISH') {

				$scope.car.status = 'CONFIRMED'
				Car.save($scope.car).then(function(retVal) {

					carCtx.navigateToFinish();

				}).catch(function(retVal) {

					alert('exception: ' + retVal);

				});

			} else if(eventType == 'GO_TO_STEP_1') {

				carCtx.navigateToStep1();
			
			} 
		});

		$scope.addPartToCar = function(part) {

			var pli = {
				partId : part.id, 
				quantity : 1,
				carId : $scope.car.id
			};

			PartLineItem.create(pli);

		};

		$scope.incrementPartQty = function(pli) {

			pli.quantity = pli.quantity + 1;
			pli.DSCompute();
			PartLineItem.save(pli);
			
		};

		$scope.decrementPartQty = function(pli) {

			if(pli.quantity > 0) {

				pli.quantity = pli.quantity - 1;
				pli.DSCompute();			
				PartLineItem.save(pli);
			
			}

		};


		$scope.removePartFromCar = function(pli) {

			PartLineItem.destroy(pli);			

		};



	}

])

	.controller('AddCarFinishCtrl',['$scope', 'carCtx', function($scope, carCtx) {

		$scope.isFinish = true;
		carCtx.setCurrentStep(3);

	}

])



	.controller('CarsCtrl',['$scope', 'Car', '$state', 'carCtx', function($scope, Car, $state, carCtx) {

		$scope.greeting = 'Hello there';
			var params = {			  
			};

		Car.bindAll(params, $scope, 'carList');
		Car.findAll();

		$scope.continueDraft = function(draft) {

				carCtx.setCarToAdd(draft);
				$state.go('addCar.step2');	

		};

				
	}

])




