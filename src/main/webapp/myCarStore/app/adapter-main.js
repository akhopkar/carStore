angular.module('carStore.adapter-main', ['js-data'])
.run(function () {

	var adapter = new DSLocalStorageAdapter();

	var store = new JSData.DS();
	store.registerAdapter('localstorage', adapter, { default: true });

});