angular.module('carStore.parts.routes',['ui.router',])
.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider

        .state('parts', {
				url: '/parts',
	            templateUrl: 'app/parts/templates/parts.html',
	            controller: 'PartsCtrl'				
	        })

        .state('parts.detail', {
				url: '/partView/{partId:[0-9]{1,4}}',
	            templateUrl: 'app/parts/templates/part-form.html',
	            controller: 'PartCtrl'
	        })

        .state('parts.add', {
				url: '/partAdd',
	            templateUrl: 'app/parts/templates/part-form.html',
	            controller: 'PartAddCtrl'
	        })




    }
  ]
);

          
