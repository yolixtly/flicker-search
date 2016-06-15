var app = angular.module('imgApp', ['ngAnimate']);

app.controller("MemoriesCtrl", function(){

	var vm = this;

	//this is false, so Results will not be shown until form is valid
	vm.showResults = false;

	vm.displayMemories = function(){
		if(vm.searchForm.$valid) {
			vm.showResults = true;
		}
	};

	vm.refreshSearch = function() {
		vm.showResults = false;
		vm.searchTerm = "";
		vm.searchForm.$setPristine();
	}
});