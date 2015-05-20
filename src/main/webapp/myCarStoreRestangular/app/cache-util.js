angular.module('carStore.cache-utils',[]) 

	.factory('restObjectCache', [function() {

		var objCache = {};

		objCache.cacheRESTEntity = function(entityName, entityID, entity) {

			var entityCache = objCache[entityName];
			if(!entityCache) {

				entityCache = {};
				objCache[entityName] = entityCache;
			}

			entityCache[entityID] = entity;

		};

		objCache.getRESTEntity = function(entityName, entityID) {

			var retVal = null;

			var entityCache = objCache[entityName];
			if(entityCache) {

				retVal = entityCache[entityID];
			}

			return retVal;

		};

		return objCache;

	}])