angular.module('carStore.cars.routes',['ui.router'])
.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider
        .state('cars', {
				url: '/cars',
	            templateUrl: 'cars.html',
	            controller: 'CarsCtrl'
	        })


        .state('addCar', {
        url: '/addCar',
              templateUrl: 'add-car.html',
              controller: 'AddCarCtrl'
          })

        .state('addCar.step1', {
        url: '/addCarStep1',
              templateUrl: 'add-car-step-1.html',
              controller: 'AddCarStep1Ctrl'
          })

        .state('addCar.step2', {
        url: '/addCarStep2',
              templateUrl: 'add-car-step-2.html',
              controller: 'AddCarStep2Ctrl'
          })

        .state('addCar.finish', {
        url: '/addCarFinish',
              templateUrl: 'add-car-finish.html',
              controller: 'AddCarFinishCtrl'
          })



    }
  ]
);