angular.module('controller-main', ['js-data'])

		  .controller('testCtrl', function ($scope, Part, Car, PartLineItem, Test, MyAction) {

			var params = {			  
			};

			Part.bindAll(params, $scope, 'parts');
			Part.findAll();
		    
			Car.bindAll(params, $scope, 'cars');
			Car.findAll();

			PartLineItem.bindAll(params, $scope, 'partLineItems');
			PartLineItem.findAll();

			Test.bindAll(params, $scope, 'tests');
			Test.findAll();

			MyAction.bindAll(params, $scope, 'myActions');
			MyAction.findAll();

			$scope.logPLIStore = function() {

				var allPLI = PartLineItem.getAll();
				console.log('ALL PART LINE ITEMS');
				console.log(allPLI);

			}

			$scope.selectCar = function(car) {

				$scope.selectedCar = car;
				console.log('SELECTED CAR --->')
				console.log(car);
				
			}

			$scope.selectPart = function(part) {

				$scope.selectedPart = part;
				console.log('SELECTED PART  --->')
				console.log(part);
				
			}

			$scope.selectPLI = function(pli) {

				$scope.selectedPLI = pli;
				console.log('SELECTED PART LINE ITEM --->')
				console.log(pli);
				
			}

			$scope.selectTest = function(test) {

				$scope.selectedTest = test;
				console.log('SELECTED TEST --->')
				console.log(test);
				
			}

			$scope.removePLI = function(pli) {

				var myPromise = PartLineItem.destroy(pli.id)

				console.log('GOT THIS PROMISE WHEN DESTROYING PART LINE ITEM');
				console.log(myPromise);

				myPromise.catch(function(err) {

					console.log('DELETE PART LINE ITEM FAILED WITH THIS ERROR');
					console.log(err);


				});

				myPromise.then(function () {

				  console.log('NOW PRINTING DESTROYED PART LINE ITEM')
				  console.log(PartLineItem.get(pli.id));
				  console.log('DONE PRINTING DESTROYED PART LINE ITEM')

				});

			}

			$scope.removeTest = function(test) {

				Test.destroy(test.id);
			}


			$scope.removeMyAction = function(act) {

				MyAction.destroy(act.id);
			}

			$scope.createPartLineItem = function() {

				if($scope.selectedCar && $scope.selectedPart) {

					var pli = {
						carId : $scope.selectedCar.id,
						partId : $scope.selectedPart.id,
						quantity : 1
					}

					PartLineItem.create(pli);

				} else {

					alert('Please Select a car and a part before creating a part line item');
				}

			}

			$scope.createMyAction = function() {

				var pNum = Math.floor((Math.random() * 1000) + 1);
				var myActionName = 'Test Action ' + pNum;
				var myActionDesc = 'Test Action Desc ' + pNum;				

				if($scope.selectedTest) {

					var myAction = {
						testId : $scope.selectedTest.id,
						name : myActionName,
						description : myActionDesc
					}

					MyAction.create(myAction);

				} else {

					alert('Please Select a Test before creating an action');
				}

			}


		  })
		  .controller('testCtrl2', function ($scope, Part, Car, Test, MyAction) {

			$scope.addRandomPart = function() {

				var pNum = Math.floor((Math.random() * 1000) + 1);
				var pGroup = pNum % 3;
				var addParams = {name : 'Test Part ' + pNum, pmodel : 'Test Model ' + pNum, brand : 'TEST ' + pNum};
				Part.create(addParams);

			};

			$scope.addRandomCar = function() {

				var pNum = Math.floor((Math.random() * 2000) + 1);
				var pGroup = pNum % 3;
				var addParams = {status : 'DRAFT', year : '' + pNum, cmodel : 'Test Model ' + pNum, make : 'TEST MAKE ' + pNum};
				Car.create(addParams);

			};

			$scope.addRandomTest = function() {

				var pNum = Math.floor((Math.random() * 2000) + 1);


				var addParams = {
						intVal : pNum, 
						stringVal : 'TEST ' + pNum, 
						booleanVal : pNum % 2 == 0};
				Test.create(addParams);

			};

			$scope.deleteCar = function(car) {

				Car.remove(car);
			}

			$scope.deletePart = function(part) {

				Part.remove(part);
			}
		  });