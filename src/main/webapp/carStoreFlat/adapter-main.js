angular.module('carStore.adapter-main', ['js-data'])
/*
.run(function (DS) {
		    DS.registerAdapter('localstorage', new DSLocalStorageAdapter(), { default: true });


		  })

  .factory('MyLocalStore', function () {
    var store = new JSData.DS();

    //store.registerAdapter('localstorage', new DSLocalStorageAdapter(), { default: true });

    return store;
  })


*/

.config(function (DSProvider, DSHttpAdapterProvider) {
			    DSProvider.defaults.basePath = '/api'; // etc.
			    DSHttpAdapterProvider.defaults.serialize = function (resourceConfig, data) {
  					//console.log('SERIALIZE WITH RESOURCE CONFIG AND DATA: ');
  					//console.log(resourceConfig);  				  					
  					//console.log(data);

  					if(resourceConfig.name == 'partLineItem') {

  						data.car = {id : data.carId, 'class' : 'com.carstore.domain.Car'};
  						data.part = {id : data.partId, 'class' : 'com.carstore.domain.Part'};
  						data.carId = null;
  						data.partId = null;

  					} else if(resourceConfig.name == 'myAction') {

  						data.test = {id : data.testId, 'class' : 'com.carstore.domain.Test'};
  						data.testId = null;

  					}

  					return data;

				};
			  
				DSHttpAdapterProvider.defaults.deserialize = function (resourceConfig, data) {
  				  console.log('DESERIALIZE WITH RESOURCE CONFIG AND DATA: ');
  				  console.log(resourceConfig);				
				  var retVals = data ? ('data' in data ? data.data : data) : data;
				  console.log(retVals);

				  var doAdapt = function(retVal) {

				  	if(retVal) {

				  		
					  if(resourceConfig.name == 'part') {

					  		// FIX partLineItems = null
						  	if(!retVal.partLineItems) {

						  		retVal.partLineItems = [];
						  	}

					  		// set the foreign key in each of the part line items
		    				angular.forEach(retVal.partLineItems, function(pli) {
						  	  pli.carId = pli.car.id;
						  	  pli.car = null;
							  pli.partId = pli.part.id;	
						  	  pli.part = null;
						    })

					  } else if(resourceConfig.name == 'partLineItem') {

					  	console.log('DESERIALIZING THIS PART LINE ITEM');
					  	console.log(retVal);

					  	// set the foreign keys corresponding to the car and the part
						  	retVal.carId = retVal.car.id;
						  	retVal.car = null;
						  	
						  	retVal.partId = retVal.part.id;
						  	retVal.part = null;


					  } else if(resourceConfig.name == 'test') {

					  		// FIX partLineItems = null
						  	if(!retVal.myActions) {

						  		retVal.myActions = [];
						  	}

						  	
					  		// set the foreign key in each of the part line items
		    				angular.forEach(retVal.myActions, function(myAct) {
						  	  myAct.testId = myAct.test.id;
						  	  myAct.test = null;

						    })
								

					  } else if(resourceConfig.name == 'myAction') {

					  	retVal.testId = retVal.test.id;
					  	retVal.test = null;
					  	
					  }
					}

				  }

				  if(retVals instanceof Array) {

				  	angular.forEach(retVals, doAdapt);

				  } else {

				  	doAdapt(retVals);
				  }


				  return retVals;
				}
				

			})
