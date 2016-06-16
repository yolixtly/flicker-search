var app = angular.module('imgApp', ['ngAnimate']);
  //helps configuring $http to make Cross-origin HTTP requests
  //this has been tested with and without it and it works fine without. leave it for now
app.config(function($httpProvider){
   $httpProvider.defaults.useXDomain = true;
});

app.controller("MemoriesCtrl",['$http', '$q', function($http, $q){

  var vm = this;

  //  variable to store the # of Photos found in the search.
  // It is initially set to null, because there is not initial number.
  vm.photosTotal = null;

  //error message is false, unless the Request gets an Error response
  vm.errorRequest = false; 

  //this is false, so Results Section will not be shown until form is valid
  vm.showResults = false;

  //this will save an array of urls to be iterate by ng-src in the UI
  vm.urlArray = [];

 
  vm.displayMemories = function(){
    if(vm.searchForm.$valid) {

      //Renders the results section, hides the search section
      vm.showResults = true;



      //Makes the REST API Request and brings with it all the goodies!
      getFlickerData();
    }
  };

  vm.refreshSearch = function() {
    vm.showResults = false;
    vm.searchTerm = "";
    vm.photos = "";
    vm.searchForm.$setPristine();
  };

//Accessing the Flicker API : 
   var getFlickerData = function(){
     var url = 'https://api.flickr.com/services/rest';
     var params = {
      method : 'flickr.photos.search',
      api_key : '500ecb12edc8c861d2e69492a08ed8f5',
      tags : vm.searchTerm,
      format : 'json',
      nojsoncallback : 1
    };

    vm.loadingMsg = true;

    $http({
        url: url,
        params: params,
        method: 'GET'
    }).then(function(response){
          console.log("getFlickerData Success!");
          console.log(response);
          vm.photosTotal = response.data.photos.total;
          vm.loadingMsg = false;
          vm.photos = response.data.photos.photo;
          
    },function(response){
         console.log("error retriving the getFlickerData");
         console.log(response);
         vm.errorRequest = true;
    });
   };

   vm.validationBox = function(){
    console.log("hi");
      if(vm.searchTerm === ""){
        vm.showValidation = true;
      } else {
       vm.showValidation = false;
     }
   };

   //creating $q promise to select all the Relevant data and place it as an image in the UI

      // var createUrl = function(response){

      //   return $q(function(resolve){

      //     for(var i = 0; i < response.photos.photo.length; i++){

      //           var farm  = response.data.photos.photo[i].farm;
      //           var server = response.data.photos.photo[i].server;
      //           var id = response.data.photos.photo[i].id;
      //           var secret = response.data.photos.photo[i].secret;

      //           // push each url to vm.urlArray
      //          vm.urlArray[i] = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';

      //         }
      //   });
      // };


        
  
}]);