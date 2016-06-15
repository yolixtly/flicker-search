var app = angular.module('imgApp', ['ngAnimate']);

app.controller("MemoriesCtrl",['$http', '$q', function($http, $q){

  var vm = this;

  // Store the number of photos returned by the API request. This number is display on the UI
  vm.photosTotal = null;

//Accessing the Flicker API : 
   var getFlickerData = function(){
     var url = 'https://api.flickr.com/services/rest/';
     var params = {
      method : 'flickr.photos.search',
      api_key : '500ecb12edc8c861d2e69492a08ed8f5',
      tags : vm.searchTerm,
      format : 'json',
      nojsoncallback : 1
    };

    $http.get(url, params).then(function(response){
          console.log("getFlickerData Success!");
          console.log(response);
          // vm.photosTotal = response.data.photos.photo;
    },function(response){
         console.log("error retriving the getFlickerData");
         console.log(response);
    });
   };


  //this is false, so Results will not be shown until form is valid
  vm.showResults = false;

  vm.displayMemories = function(){
    if(vm.searchForm.$valid) {
      vm.showResults = true;
      getFlickerData();
    }
  };

  vm.refreshSearch = function() {
    vm.showResults = false;
    vm.searchTerm = "";
    vm.searchForm.$setPristine();
  };
}]);